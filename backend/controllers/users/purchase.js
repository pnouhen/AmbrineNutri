const User = require("../../models/Users");
const Recipes = require("../../models/Recipes");

const { isValidAddress } = require("../../utils/isValidAddress");
const { isValidPayment } = require("../../utils/isValidPayment");

const { generateInvoice } = require("../generateInvoice");

exports.purchasesRecipes = async (req, res) => {
  try {
    const { infopurchasesRecipes } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    if (infopurchasesRecipes.panier.length === 0)
      return res.status(400).json({ message: "panier vide" });

    // Recipes doesn't already purchased
    const alreadyPurchased = infopurchasesRecipes.panier.some((idPanier) =>
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
    if (!infopurchasesRecipes.address?.isDefault && !hasDefault)
      return res
        .status(400)
        .json({ message: "Aucune adresse n'est sélectionnée" });

    // Check address is good
    if (!isValidAddress(infopurchasesRecipes.address))
      return res
        .status(400)
        .json({ message: "Certains champs sont pas remplis correctement" });

    // Check all the elements of payment
    if (!isValidPayment(infopurchasesRecipes))
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

    generateInvoice(req, userId, recipesName);

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
      .then((recipeSelect) => {
        // Associate the URL to manage retrieving images from the server
        const recipeWithUrl = {
          ...recipeSelect._doc,
          imageUrl: `${req.protocol}://${req.get("host")}/assets/img/recipes/${
            recipeSelect.img
          }`,
        };
      })
      .catch((error) => res.status(400).json({ error }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
