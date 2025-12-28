const express = require("express");
const router = express.Router();
const User = require("../models/User");
console.log("Auth router loaded");


// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExist = await User.findOne({ email });
    if (userExist) return res.json({ message: "User already exists" });

    // Create user
    const user = new User({ name, email, password });
    await user.save();

    res.json({ message: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "User not found" });

    // Check password
    if (user.password !== password) {
      return res.json({ message: "Wrong password" });
    }

    res.json({ message: "Login successful", userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
