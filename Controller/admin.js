const express = require("express");
const app = express();

const User = require("../Schema/User");
const Item = require("../Schema/Item");
const order = require("../Schema/Order");

exports.AdminOrNot = async (req,res)=>{
    let idOfUser = req.cookies.rol;
   try {
    let findUser = await User.findOne({ id: idOfUser });
    if(findUser){
       res.send({rank:findUser.rank})
    }else
    res.send({rank:'Error'})
   } catch (e) {
       console.log("error !!!! get admin or no " + e.message)
   }
  };



  exports.changeStatus = async(req,res)=>{
    const data = req.body;
    let idOfUser = req.cookies.rol;
    try {
        let findUser = await User.findOne({ id: idOfUser });
    if(findUser && findUser.rank == "admin"){
      let orderToChange =await order.findOne({_id:data.id})
      if(orderToChange){
        console.log(data.statusChange)
        orderToChange.status = data.statusChange;
        if(data.statusChange === "Arrived Sucessfully" || data.statusChange === "Order Canceled" || data.statusChange === "out of stock"){
          orderToChange.closed = true;
        }else{
          orderToChange.closed = false;
        }
        orderToChange.save().then(()=>{
          res.send({changed:true})
  })
      }
  
        else{
          res.send({changed:false})  
        }  
    }
    } catch (e) {
        console.log("change status error msg : " + e.message)
    }
  };

  exports.getUserName = async (req,res)=>{
    const data = req.body;
    let idOfUser = req.cookies.rol;
    let findUser = await User.findOne({ id: idOfUser });
    if(findUser && findUser.rank == "admin"){
        User.find({ id:data.id},(err,e)=>{
          let fullName = e[0].FirstName + " " + e[0].LastName
          res.send({fullName})
        })        
    }else{
            res.send({fullName:"null null"}) 
    }

  };




exports.getAllOrders = async(req,res)=>{
    let idSearch = req.cookies.rol;
    let findUser = await User.findOne({id:idSearch});
  if(findUser && findUser.rank == "admin"){
    try {
      order.find({},(err,e)=>{
        try {
          res.send({orders:e})
        } catch (e) {
          console.log(e.message)
        }
      })
    } catch (error) {
     console.log(error.message)
    }
  }
  }


  exports.addItem = async (req, res) => {
    const itemInfo = req.body;
    let idOfUser = req.cookies.rol;
    try {
        let findUser = await User.findOne({ id: idOfUser });
    if (findUser && findUser.rank == "admin") {
      let findItem = await Item.findOne({ id: itemInfo.id });
      if (!findItem) {
        const newItem = new Item({
          id: itemInfo.id,
          type: itemInfo.type,
          imgsrc: itemInfo.imgsrc,
          title: itemInfo.title,
          price: itemInfo.price,
          quantity: 1,
          descrption: itemInfo.descrption,
        });
        newItem.save().then(() => {
          res.send({ addedItem: true });
        });
      } else {
        res.send({ addedItem: false });
      }
    } else {
      res.send({ addedItem: null });
    }
    } catch (e) {
        console.log("line 116  msg = " + e.message)
    }
  };
  
  exports.getAllItemsShop = (req, res) => {
   try {
    Item.find({}, (err, e) => {
        res.send(e);
      });
   } catch (e) {
    console.log("line 126  msg = " + e.message)
   }
  };
  
  exports.changePriceItem = async (req, res) => {
    let Details = req.body;
    let idOfUser = req.cookies.rol;
    try {
        let findUser = await User.findOne({ id: idOfUser });
    let Item1 = await Item.findOne({ id: Details.id });
    if (Item1 && findUser && findUser.rank == "admin") {
      Item1.price = Details.price;
      Item1.save();
      res.send({ updated: true });
    } else {
      res.send({ updated: false });
    }
    } catch (e) {
        console.log("line 144  msg = " + e.message)  
    }
  };
  


 exports.removeItem =  async (req, res) => {
    let Details = req.body;
    let idOfUser = req.cookies.rol;
    try {
        let findUser = await User.findOne({ id: idOfUser });
    let Itemfound = await Item.findOne({ id: Details.id });
    if (Itemfound && findUser && findUser.rank == "admin") {
      Item.deleteOne(Itemfound).then(() => res.send({ removed: true }));
    } else {
      res.send({ removed: false });
    }
    } catch (e) {
        console.log("line 162  msg = " + e.message)   
    }
  };
  
       
  exports.SearchAdminPage = (req, res) => {
    const data = req.body;
    let arr = []
    try {
        if (data.selectSearch === "all") {
            Item.find({},(err,e)=>{
              if(err)
              console.log("error")
              else
              e.forEach(item=>{
                if(item.title.toLowerCase().includes(data.search.toLowerCase())){
                  arr.push(item)
                }
              })
              res.send(arr)
            })
        
          } else {
            Item.find({ type: data.selectSearch }, (err, e) => {
              e.forEach(item=>{
                if(item.title.toLowerCase().includes(data.search.toLowerCase())){
                  arr.push(item)
                }
              })
              res.send(arr)
            });
          }
    } catch (error) {
        console.log("line 195  msg = " + e.message)  
    }
  };