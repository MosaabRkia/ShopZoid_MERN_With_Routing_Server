const express = require("express");
const app = express();

const User = require("../Schema/User");
const Item = require("../Schema/Item");
const order = require("../Schema/Order");


exports.getAllItems = (req, res) => {
    let catalog = req.body;
    try {
    Item.find({ type: catalog.type }, (err, e) => {
      res.send(e);
    });
    } catch (e) {
        console.log(`error in get catalog : ${catalog} all items  msg is : `+e.message)
    }
  };


  exports.getItem = async (req, res) => {
    let idSearch = req.body;
    try {
    let item = await Item.findOne({ id: idSearch.id });
    if (item) {
      res.send({ item });
    }               
    } catch (e) {
        console.log("id item is :" + idSearch + " error in get this item msg is : " + e.message)

    }
  };