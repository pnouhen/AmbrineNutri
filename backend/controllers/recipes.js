const Recipes = require("../models/Recipes");

exports.showRecipes = (req, res) => {
  Recipes.find()
    .then((recipes) => res.status(200).json(recipes))
    .catch((error) => res.status(400).json({ error }));
};
