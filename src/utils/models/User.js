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
    password: {
      type: String,
      required: true,
    },
    isVerifiedEmail: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.users || mongoose.model("users", UserSchema);
