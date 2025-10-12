import express from "express";
import multer from "multer";
import path from "path";
import Product from "../models/Product.js";

const router = express.Router();

// 🧠 Setup multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder to store images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  },
});

const upload = multer({ storage });

// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Add new product with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      image,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "✅ Product added successfully!",
      product: savedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "❌ Error adding product", error: error.message });
  }
});

export default router;
