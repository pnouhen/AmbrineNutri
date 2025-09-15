const mongoose = require("mongoose");

// Schemas for the main schema : recipeSchema
const categorieSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  text: { type: String, required: true },
});

const ingredientsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  dosage: { type: Number, required: true },
});

// Main Schema
const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
  vegetarien: { type: String, required: true },
  categorie: { categorieSchema },
  duration: { type: String, required: true },
  ingredients: [ingredientsSchema],
  ustensils: [{ type: String, required: true }],
  steps: [{ type: String, required: true }],
});

module.exports = mongoose.model("Recipes", recipeSchema);
