const express = require("express");
const router = express.Router();

const reviewsCtrl = require("../controllers/reviews");

router.get("/", reviewsCtrl.showReviews);

router.post("/", reviewsCtrl.createReviews);

module.exports = router;
