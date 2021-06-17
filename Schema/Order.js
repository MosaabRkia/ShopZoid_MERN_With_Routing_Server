const mongoose = require('mongoose');
//order Schema
const order = mongoose.model("order", {
    userId: String,
    orderId: String,
    listItems: Array,
    datePlaceOrder:Date,
    dateArrivedOrder:Date,
    status:String,
    closed:Boolean
  });
  
  module.exports = order;