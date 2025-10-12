import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String, default: "https://via.placeholder.com/200" },
    category: { type: String, default: "General" },
    stock: { type: Number, default: 10 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
