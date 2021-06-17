const mongoose = require("mongoose");

const User = mongoose.model("User", {
    id: String,
    FirstName: String,
    LastName: String,
    Email: String,
    Password: String,
    curPassword: String,
    rank: String,
    cartList: Array,
    wishList: Array,
    ordersList:[{type: mongoose.Schema.Types.ObjectId, ref: 'order'}],
  });
  
  module.exports = User;