const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,      // Assuming 'name' was missing a key in your schema
  price: Number,
  productImage: { type: String, required: true },
});
module.exports = mongoose.model("Product", productSchema);
