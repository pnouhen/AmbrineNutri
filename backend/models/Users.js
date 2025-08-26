const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  address: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  id: { type: Number, required: true },
  isDefault: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  panier: { type: [String], required: true, default: [] },
  purchases: { type: [String], required: true, default: [] },
  addresses: [addressSchema],
});

module.exports = mongoose.model("User", userSchema);
