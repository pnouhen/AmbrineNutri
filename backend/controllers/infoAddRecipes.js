const InfoAddRecipes = require("../models/InfoAddRecipes");

exports.showInfoAddRecipes = (req, res) => {
  InfoAddRecipes.find()
    .then((infoAddRecipes) => res.status(200).json(infoAddRecipes))
    .catch((error) => res.status(400).json({ error }));
}