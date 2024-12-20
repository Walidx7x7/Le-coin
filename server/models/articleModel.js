const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  condition: { type: String, required: true, enum: ["new", "used"] },
  price: { type: Number, required: true, min: 0 },
  imagePath: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Article", ArticleSchema);
