const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PendingOrderSchema = new Schema({
  buyerQty: Number,
  buyerPrice: Number,
  sellerPrice: Number,
  sellerQty: Number
});

module.exports = mongoose.model('PendingOrder', PendingOrderSchema);
