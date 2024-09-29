const mongoose = require("mongoose");

const opticalSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.opticals || mongoose.model("opticals", opticalSchema);
