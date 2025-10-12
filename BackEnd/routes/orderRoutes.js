import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const router = express.Router();

// ✅ Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("productId", "name");
    res.json(
      orders.map((o) => ({
        _id: o._id,
        customerName: o.customerName,
        phone: o.phone,
        address: o.address,
        quantity: o.quantity,
        product: o.productId,
      }))
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add a new order
router.post("/", async (req, res) => {
  try {
    const { customerName, phone, address, productId, quantity } = req.body;

    // Check required fields
    if (!customerName || !phone || !address || !productId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = new Order({
      customerName,
      phone,
      address,
      productId,
      quantity: quantity || 1,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Error adding order:", err);
    res.status(500).json({ message: "Failed to add order" });
  }
});

// ✅ Delete an order
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ message: "Failed to delete order" });
  }
});

export default router;
