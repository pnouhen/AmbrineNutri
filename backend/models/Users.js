const mongoose = require("mongoose");

// Schema for the main schema : userSchema
const addressSchema = new mongoose.Schema({
  lastName: { type: String, required: false },
  firstName: { type: String, required: false },
  address: { type: String, required: false },
  postalCode: { type: String, required: false },
  city: { type: String, required: false },
  country: { type: String, required: false },
  isDefault: { type: Boolean, required: false, default: true },
});

const userSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  panier: { type: [String], required: false, default: [] },
  purchases: { type: [String], required: false, default: [] },
  addresses: [addressSchema],
});

module.exports = mongoose.model("User", userSchema);
