const mongoose = require("mongoose");

const pricesSchema = mongoose.Schema({
  type: { type: String, required: true },
  values: { type: Object, required: true },
});

module.exports = mongoose.model("Prices", pricesSchema);
