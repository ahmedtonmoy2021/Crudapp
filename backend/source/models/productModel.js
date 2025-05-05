import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" }, 
  price: { type: Number, required: true },
  category: { type: String, default: "" },
  isActive: { type: Boolean, default: false }, 
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
