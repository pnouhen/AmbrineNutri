const express = require("express");
const router = express.Router();

const recipeCtrl = require("../controllers/recipe");

router.get("/", recipeCtrl.showRecipe);

module.exports = router;
