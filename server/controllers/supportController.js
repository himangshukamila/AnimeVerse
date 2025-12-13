const SupportMessage = require("../models/SupportMessage");

const createSupportMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newMessage = await SupportMessage.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      data: newMessage,
    });
  } catch (error) {
    console.error("Support Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error, please try again." });
  }
};

module.exports = { createSupportMessage };
