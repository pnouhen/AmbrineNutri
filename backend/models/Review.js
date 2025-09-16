const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  // Field for sort review
  date: { type: Date, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1 },
});

module.exports = mongoose.model("Review", reviewSchema);
