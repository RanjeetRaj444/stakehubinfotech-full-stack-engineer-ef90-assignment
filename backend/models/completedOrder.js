const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompletedOrderSchema = new Schema({
  price: Number,
  qty: Number,
  completedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CompletedOrder', CompletedOrderSchema);
