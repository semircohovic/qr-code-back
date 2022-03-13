const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  tin: {
    type: String,
    required: true,
  },
  iic: {
    type: String,
    required: true,
  },
  dateTimeCreated: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
