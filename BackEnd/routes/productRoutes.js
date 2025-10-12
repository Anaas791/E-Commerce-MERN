import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new product
router.post("/", async (req, res) => {
  const { name, description, price, image, category, stock } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      image,
      category,
      stock,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "Product added successfully!", product: savedProduct });
  } catch (error) {
    res.status(400).json({ message: "Error adding product", error: error.message });
  }
});

export default router;
