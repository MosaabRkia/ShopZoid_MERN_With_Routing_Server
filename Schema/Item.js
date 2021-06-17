const mongoose = require("mongoose");

//item Schema
const Item = mongoose.model("Item", {
    id: Number,
    type: String,
    imgsrc: String,
    title: String,
    price: Number,
    quantity: Number,
    descrption: String,
  });

  module.exports = Item;