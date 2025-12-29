const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  income: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Income", incomeSchema);
