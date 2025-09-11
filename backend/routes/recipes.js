const express = require("express");
const router = express.Router();

const recipesCtrl = require("../controllers/recipes");

router.get("/", recipesCtrl.showRecipes);
router.get("/:id", recipesCtrl.showRecipeSelect)

module.exports = router;
