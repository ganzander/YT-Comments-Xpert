const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Not Valid Email");
        }
      },
    },
    cart: {
      type: Array,
      default: [],
    },
    orders: {
      type: Array,
      default: [],
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerifiedPhone: {
      type: Boolean,
      default: false,
    },
    isVerifiedEmail: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    otp: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.users || mongoose.model("users", UserSchema);
