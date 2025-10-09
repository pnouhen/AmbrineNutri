const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const pricesCtrl = require("../controllers/admin/prices")

// Router for prices
router.put("/me/admin/changePrices", auth, pricesCtrl.changePrices)


module.exports = router

