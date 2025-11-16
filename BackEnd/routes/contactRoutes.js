import express from "express";
import Message from "../models/message.js";

const router = express.Router();

// 📩 Save user message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "All fields required" });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.json({ success: true, message: "Message saved successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 🗂 Get all messages (Admin)
router.get("/", async (req, res) => {
  const messages = await Message.find().sort({ date: -1 });
  res.json(messages);
});

export default router;
