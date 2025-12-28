const express = require("express");
const router = express.Router();
const Income = require("../models/Income");
const Expense = require("../models/Expense");

// Get User Balance
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Get income
    const incomeData = await Income.findOne({ userId });
    const totalIncome = incomeData ? incomeData.amount : 0;

    // Get total expenses
    const expenses = await Expense.find({ userId });
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Calculate balance
    const balance = totalIncome - totalExpenses;

    res.json({
      totalIncome,
      totalExpenses,
      balance,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
