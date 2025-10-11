const User = require("../../models/Users");
const Recipes = require("../../models/Recipes");

const { isValidAddress } = require("../../utils/isValidAddress");
const { isValidPayment } = require("../../utils/isValidPayment");

const { generateInvoice } = require("../../utils/generateInvoice");

const path = require("path");
const sharp = require("sharp");

exports.purchasesRecipes = async (req, res) => {
  try {
    const  infoPurchasesRecipes = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    if (infoPurchasesRecipes.panier.length === 0)
      return res.status(400).json({ message: "panier vide" });

    // Recipes doesn't already purchased
    const alreadyPurchased = infoPurchasesRecipes.panier.some((idPanier) =>
      user.purchases.includes(idPanier)
    );
    if (alreadyPurchased)
      return res
        .status(400)
        .json({ message: "Au moins une recette est déjà achetée" });

    // Check one address is défault
    const hasDefault = user.addresses.some(
      (address) => address.isDefault === true
    );
    if (!infoPurchasesRecipes.address?.isDefault && !hasDefault)
      return res
        .status(400)
        .json({ message: "Aucune adresse n'est sélectionnée" });

    // Check address is good
    if (!isValidAddress(infoPurchasesRecipes.address))
      return res
        .status(400)
        .json({ message: "Certains champs sont pas remplis correctement" });

    // Check all the elements of payment
    if (!isValidPayment(infoPurchasesRecipes))
      return res
        .status(400)
        .json({ message: "Un des éléments du paiement est mal rempli" });

    user.purchases = [...user.purchases, ...user.panier];

    // Generate Invoice
    const recipesName = await Promise.all(
      user.panier.map((recipeId) =>
        Recipes.findById(recipeId).then((r) => r.title)
      )
    );

    generateInvoice(req, userId, recipesName, infoPurchasesRecipes);

    // Reset panier here for added safety
    user.panier = [];

    await user.save();

    return res.status(200).json({
      purchases: user.purchases,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.showRecipeSelectPurchase = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    if (!user.purchases.includes(recipeId))
      return res.status(400).json({ message: "Recette non acheté" });

    Recipes.findById(recipeId)
      .then(async (recipeSelect) => {
        // Associate the URL to manage retrieving images from the server
        const recipeWithUrl = {
          ...recipeSelect._doc,
          imageUrl: `${req.protocol}://${req.get("host")}/assets/img/recipes/${
            recipeSelect.img
          }`,
        };

        // Convert recipe image
        const imgPath = path.join(
          __dirname,
          "../../assets/img/recipes/",
          recipeSelect.img
        );
        const imgJpeg = await sharp(imgPath).jpeg({ quality: 90 }).toBuffer();

        const recipeWithImage = {
          ...recipeWithUrl,
          imageBase64: imgJpeg.toString("base64"),
        };

        res.status(200).json(recipeWithImage);
      })
      .catch((error) => res.status(400).json({ error }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
