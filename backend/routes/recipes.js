const express = require("express");
const router = express.Router();

const recipesCtrl = require("../controllers/recipes");

router.get("/", recipesCtrl.showRecipes);

// Routers for RecipeDetails
router.get("/:id", recipesCtrl.showRecipeSelectNoPurchase);

module.exports = router;
