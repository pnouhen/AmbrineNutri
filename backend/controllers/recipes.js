const Recipes = require("../models/Recipes");

exports.showRecipes = (req, res) => {
  Recipes.find()
    .select("-steps")
    .select("-ingredients.quantity")
    .then((recipes) => res.status(200).json(recipes))
    .catch((error) => res.status(400).json({ error }));
};

exports.showRecipeSelectNoBuy = (req, res) => {
  const recipeId = req.params.id;
  if (!recipeId)
    return res.status(404).json({ message: "Recette non trouvée" });

  Recipes.findById(recipeId)
    .select("-steps")
    .select("-ingredients.quantity")
    .then((recipeSelect) => res.status(200).json(recipeSelect))
    .catch((error) => res.status(400).json({ error }));
};
