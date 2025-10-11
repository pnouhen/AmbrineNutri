const User = require("../../models/Users");
const Recipes = require("../../models/Recipes");
const path = require("path");
const sharp = require("sharp");

exports.displayRecipesDetails = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "Utilisateur introuvable" });

    if (user.role !== "admin")
      return res.status(403).json({ message: "Accès refusé" });

    const recipeSelect = await Recipes.findById(recipeId);
    if (!recipeSelect)
      return res.status(404).json({ message: "Recette introuvable" });

    const imgPath = path.join(
      __dirname,
      "../../assets/img/recipes/",
      recipeSelect.img
    );

    const imgJpeg = await sharp(imgPath).jpeg({ quality: 90 }).toBuffer();

    const recipeWithImage = {
      ...recipeSelect._doc,
      imageUrl: `${req.protocol}://${req.get("host")}/assets/img/recipes/${
        recipeSelect.img
      }`,
      imageBase64: imgJpeg.toString("base64"),
    };

    res.status(200).json(recipeWithImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
