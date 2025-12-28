const express = require("express");
const router = express.Router();
const Income = require("../models/Income");

// Add / Update Income
router.post("/", async (req, res) => {
  try {
    const { userId, amount } = req.body;

    // Check if user already has income
    let income = await Income.findOne({ userId });
    if (income) {
      income.amount = amount; // update
      await income.save();
      return res.json({ message: "Income updated", income });
    }

    // New income
    income = new Income({ userId, amount });
    await income.save();
    res.json({ message: "Income saved", income });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get User Income
router.get("/:userId", async (req, res) => {
  try {
    const income = await Income.findOne({ userId: req.params.userId });
    res.json({ income: income ? income.amount : 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
