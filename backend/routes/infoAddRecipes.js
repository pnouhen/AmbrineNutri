const express = require("express");
const router = express.Router();

const infoAddRecipesCtrl = require("../controllers/infoAddRecipes");

router.get("/", infoAddRecipesCtrl.showInfoAddRecipes);

module.exports = router;
