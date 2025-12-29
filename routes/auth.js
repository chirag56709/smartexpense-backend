const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let existingUser = await User.findOne({ email });
    if (existingUser) return res.json({ message: "User already exists" });

    const user = new User({ name, email, password });
    await user.save();
    res.json({ message: "Signup successful", userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "User not found" });
    if (user.password !== password) return res.json({ message: "Wrong password" });
    res.json({ message: "Login successful", userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
