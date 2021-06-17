const express = require("express");
const app = express();

const User = require("../Schema/User");
const Item = require("../Schema/Item");
const order = require("../Schema/Order");



exports.getPlacedOrders = async (req,res)=>{
    let idOfUser = req.cookies.rol;
    let findUser = await User.findOne({ id: idOfUser });
    let listOrders = []
    if (findUser) {
      findUser.ordersList.map(e=>{
          order.find({_id:e._id},(error,e)=>{
          if(error){
            throw new error("invalid")
          }else
           listOrders.push(e)
    })
      })
  
    }
    try {
      setTimeout(()=>{
        res.send({List:listOrders})
        },1000)
    } catch (error) {
      throw new error("not worked sending list orders")
    }
  
  };