const express = require("express");
const router = express.Router();
const Income = require("../models/Income");

router.get("/:userId", async (req, res) => {
  try {
    let doc = await Income.findOne({ userId: req.params.userId });
    if (!doc) {
      return res.json({ income: 0 });
    }
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:userId", async (req, res) => {
  try {
    const { income } = req.body;

    let doc = await Income.findOne({ userId: req.params.userId });
    if (!doc) {
      doc = new Income({ userId: req.params.userId, income });
    } else {
      doc.income = income;
    }

    await doc.save();
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
