const mongoose = require("mongoose");

const infoAddRecipeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  values: { type: Array, required: true },
});

module.exports = mongoose.model("InfoAddRecipe", infoAddRecipeSchema);
