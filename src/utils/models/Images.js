const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "opticals",
  },
  imgUrls: {
    type: Array,
    default: [],
  },
});

module.exports =
  mongoose.models.images || mongoose.model("images", imageSchema);
