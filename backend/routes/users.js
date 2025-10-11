const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const authCtrl = require("../controllers/users/auth");
const panierCtrl = require("../controllers/users/panier");
const addressesCtrl = require("../controllers/users/address");
const purchaseCtrl = require("../controllers/users/purchase");
const invoiceRecipesCtrl = require("../controllers/users/invoice")

// Routers for AuthPage
router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);
router.get("/me", auth, authCtrl.getMe);

// Routers for panier
router.post("/me/panier", auth, panierCtrl.addToPanier);
router.delete("/me/panier/:recipeId", auth, panierCtrl.removeToPanier);

// Router for addresses
router.post("/me/addresses", auth, addressesCtrl.addToAddress);
router.put("/me/addresses", auth, addressesCtrl.updateAddressById);
router.delete("/me/addresses/:addressId", auth, addressesCtrl.removeToAddress);

// Router for purchase
router.post("/me/purchasesRecipes", auth, purchaseCtrl.purchasesRecipes);
router.get(
  "/me/showRecipeSelectPurchase/:id",
  auth,
  purchaseCtrl.showRecipeSelectPurchase
);

// Router for invoice
router.get("/me/invoicesRecipes/", auth, invoiceRecipesCtrl.getInvoicesRecipes)
router.get("/me/invoicesRecipes/:fileName", auth, invoiceRecipesCtrl.sendFile)

module.exports = router;
