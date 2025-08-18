const express = require("express");
const router = express.Router();

const pricesCtrl = require("../controllers/prices");

router.get("/", pricesCtrl.showPrices);

module.exports = router;
