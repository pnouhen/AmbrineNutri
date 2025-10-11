const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const recipesAdminCtrl = require("../controllers/admin/adminRecipes");
router.get("/recipes/:id", auth, recipesAdminCtrl.displayRecipesDetails);

module.exports = router;
