const Recipes = require("../models/Recipes");

exports.showRecipes = (req, res) => {
  Recipes.find()
    .select("-steps")
    .select("-ingredients.quantity")
    .then((recipes) => {
      // Associate the URL to manage retrieving images from the server
      const recipesWithUrl = recipes.map((rcp) => ({
        ...rcp._doc,
        imageUrl: `${process.env.Protocol}://${req.get("host")}/assets/img/recipes/${
          rcp.img
        }`,
      }));
      res.status(200).json(recipesWithUrl);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.showRecipeSelectNoPurchase = (req, res) => {
  const recipeId = req.params.id;
  if (!recipeId)
    return res.status(404).json({ message: "Recette non trouvée" });

  Recipes.findById(recipeId)
    .select("-steps")
    .select("-ingredients.quantity")
    .then((recipeSelect) => {
      // Associate the URL to manage retrieving images from the server
      const recipeWithUrl = {
        ...recipeSelect._doc,
        imageUrl: `${process.env.Protocol}://${req.get("host")}/assets/img/recipes/${
          recipeSelect.img
        }`,
      };
      res.status(200).json(recipeWithUrl);
    })
    .catch((error) => res.status(400).json({ error }));
};
