const Recipe = require("../models/Recipe");

exports.showRecipe = (req, res) => {
  Recipe.find()
    .then((recipes) => res.status(200).json(recipes))
    .catch((error) => res.status(400).json({ error }));
};
