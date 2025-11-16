import Message from "./models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Check required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Save message to MongoDB
    const newMessage = new Message({
      name,
      email,
      message,
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Message saved successfully",
    });
  } catch (error) {
    console.error("❌ Error saving message:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
