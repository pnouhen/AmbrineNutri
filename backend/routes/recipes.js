const express = require("express");
const router = express.Router();

const recipesCtrl = require("../controllers/recipes");

router.get("/", recipesCtrl.showRecipes);

module.exports = router;
