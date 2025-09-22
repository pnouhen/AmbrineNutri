const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/users");
const auth = require("../middleware/auth");

// Routers for AuthPage
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/me", auth, userCtrl.getMe);

// Routers for panier
router.post("/me/panier", auth, userCtrl.addToPanier);
router.delete("/me/panier/:recipeId", auth, userCtrl.removeToPanier);

// Router for addresses
router.post("/me/addresses", auth, userCtrl.addToAddress);
router.put("/me/addresses", auth, userCtrl.updateAddressById);
router.delete("/me/addresses/:addressId", auth, userCtrl.removeToAddress);

// Router for buy
router.post("/me/buyRecipes", auth, userCtrl.purchasedRecipes)

module.exports = router;
