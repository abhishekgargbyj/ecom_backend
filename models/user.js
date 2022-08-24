const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  address: {
    houseNumber: { type: String },
    street: { type: String },
    area: { type: String },
    city: { type: String },
    pincode: { type: Number },
  },
  isAdmin: { type: Boolean, default: false },
  refreshToken: { type: String, default: false },
});

const User = mongoose.model("user", userSchema);

module.exports = User;