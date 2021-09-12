const express = require("express");
const app = express();

const User = require("../Schema/User");
const Item = require("../Schema/Item");
const order = require("../Schema/Order");

function newUID() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }




// register
exports.register = async (req, res) => {

  try{
    const newUsr = req.body;
    let newId = newUID();
     const checkExits = await User.findOne({ Email: newUsr.email });
    if (!checkExits) {
      const newUser = new User({
        id: newId,
        FirstName: newUsr.firstName,
        LastName: newUsr.lastName,
        Email: newUsr.email.toLowerCase(),
        Password: newUsr.password,
        curPassword: newUsr.conPassword,
        rank: "member",
        cartList: [],
        wishList: [],
        ordersList: [],
      });
      newUser.save().then(() => {
        res.send({ registered: true });
      });
    } else {
      res.send({ registered: false });
    }
  }catch(e){
      console.log("error create user " + e)
  }
   
  };





  exports.logout = (req, res)=>{
    res.clearCookie('rol')
    res.send({logout:true})
  };





  exports.login = async (req, res) => {
    const checkUsr = req.body;
  try{
let checkExits = await User.findOne({
      Email: checkUsr.loginEmail.toLowerCase(),
      Password: checkUsr.loginPassword,
    });
    if (checkExits) {
      res.cookie("rol", checkExits.id);
      if (checkExits.rank === "admin") {
        res.send({ login: "admin" });
      } else {
        res.send({ login: true });
      }
    } else {
      res.send({ login: false });
    }
  }catch(e){
console.log("error in sign in , message error : " + e.message)
  }
    
  };






   //get first _ last name in profile page
   exports.userName = async (req, res) => {
    try{
let idSearch = req.cookies.rol;
  let findUser = await User.findOne({ id: idSearch });
  if (findUser) {
    res.send({ FirstName: findUser.FirstName, LastName: findUser.LastName });
  } else {
    res.send({ found: false });
  }
    }catch(e){
console.log("error getting name ! Messege error : " + e.message )
    }
};






exports.changeEmail = async (req, res) => {
    try{
        const emails = req.body;
        console.log(emails)
        let idSearch = req.cookies.rol;
        let findUser = await User.findOne({ id: idSearch, Email: emails.oldEmail });
        let newEmailSure = await User.findOne({ Email: emails.newEmail });
        if (findUser && !newEmailSure) {
          findUser.Email = emails.newEmail;
          findUser.save().then(() => {
            res.send({ changed: true });
          });
        } else {
          res.send({ changed: false });
        }
    }catch(e){
console.log("change Email error message : " + e.message)
    }
  };






  exports.changePassword = async (req, res) => {
    try {
        const passwords = req.body;
    let idSearch = req.cookies.rol;
    let findUser = await User.findOne({
      id: idSearch,
      Password: passwords.oldPassword,
    });
    if (findUser) {
      findUser.Password = passwords.newPassword;
      findUser.save().then(() => {
        res.send({ changed: true });
      });
    } else {
      res.send({ changed: false });
    }
    } catch (e) {
        console.log("changing password error Message : " + e.message)
    }
  };


  exports.cartList = async (req, res) => {
    try {
        let idSearch = req.cookies.rol;
    let findUser = await User.findOne({ id: idSearch });
    if (findUser) {
      res.send({ cartList: findUser.cartList });
    }
    } catch (e) {
        console.log("error cartlist get msg : " + e.message )
    }
  };

  
exports.gettotalCart = async (req, res) => {
    try {
        let idOfUser = req.cookies.rol;
    let findUser = await User.findOne({ id: idOfUser });
    let total = 0;
    if (findUser) {
      !!findUser.cartList &&
        findUser.cartList.map((e) => {
          total += e.item.price * e.quantity;
        });
    }
    res.send({ total:total.toFixed(2) });
    } catch (e) {
        console.log("error in get total cart price  msg : " + e.message)
    }
  };


  exports.addCartList = async (req, res) => {
    try {
        let idOfItem = req.body;
        console.log(idOfItem.itemId)
    let idSearch = req.cookies.rol;
    let findItem = await Item.findOne({ id: idOfItem.itemId });
    let findUser = await User.findOne({ id: idSearch });
    if (findUser && findItem) {
      let id=findItem.id
      let objn = {item:findItem,id:id,quantity:1}
      findUser.cartList = [...findUser.cartList, objn];
      findUser.save().then(() => {
        res.send({ added: true });
      });
    } else {
      res.send({ added: false });
    }
    } catch (e) {
        console.log("error in add to cart msg :" + e.message)
    }
  };


  exports.changeQuantity = async (req, res) => {
   try {
    const data = req.body;
    let idOfUser = req.cookies.rol;
    let findUser = await User.findOne({ id: idOfUser });
    let findItem = await Item.findOne({ id: data.id });
  let cartList = findUser.cartList.map(e=>{if(e.id == data.id)e.quantity=data.quantity})
  let objn = {item:findItem,id:findItem.id,quantity:data.quantity}
   User.updateOne({'cartList.id':data.id},{'$set':{'cartList.$':objn}}).then(()=>{
    console.log("saved")
  })
   } catch (e) {
       console.log("error change quantity msg : " + e.message)
   }
  };




exports.removeCartList = async (req, res) => {
try {
    let idOfItem = req.body;
    let idSearch = req.cookies.rol;
    let findUser = await User.findOne({ id: idSearch });
    if (findUser) {
      let example = findUser.cartList.filter((e) => {
        return e.id !== parseInt(idOfItem.id);
      });
      findUser.cartList = example;
      findUser.save().then(() => {
        res.send({ removed: true });
      });
    } else {
      res.send({ removed: false });
    }
} catch (e) {
    console.log("error remove cart msg : " + e.message)
}
  };


  exports.getWishList = async (req, res) => {
  try {
    let idSearch = req.cookies.rol;
    let findUser = await User.findOne({ id: idSearch });
    if (findUser) {
      res.send({ wishList: findUser.wishList });
    }
  } catch (e) {
      console.log("wish list error  msg : " + e.message)
  }
  };

  exports.addWishList = async (req, res) => {
    let idOfItem = req.body;
    let idSearch = req.cookies.rol;
    let findItem = await Item.findOne({ id: idOfItem.itemId });
    let findUser = await User.findOne({ id: idSearch });
    if (findUser && findItem) {
      findUser.wishList = [...findUser.wishList, findItem];
      findUser.save().then(() => {
        res.send({ added: true });
      });
    } else {
      res.send({ added: false });
    }
  };



  exports.removeWishList = async (req, res) => {
    let idOfItem = req.body;
    let idSearch = req.cookies.rol;
    let findUser = await User.findOne({ id: idSearch });
    if (findUser) {
      let example = findUser.wishList.filter((e) => {
        return e.id !== parseInt(idOfItem.id);
      });
      findUser.wishList = example;
      findUser.save().then(() => {
        res.send({ removed: true });
      });
    } else {
      res.send({ removed: false });
    }
  };

  function newIdOrder() {
    return "*" + Math.random().toString(36).substr(2, 150);
  }


  exports.createNewOrder = async (req, res) => {
    let idSearch = req.cookies.rol;
   try {
    let findUser = await User.findOne({ id: idSearch });
    let today = new Date().toISOString().slice(0, 10)
    if(findUser){
      let newOrd = findUser.cartList;
        let idNew = newIdOrder();
        const newOrder = new order({
          userId: req.cookies.rol,
          orderId: idNew,
          listItems: newOrd,
          datePlaceOrder:today,
          dateArrivedOrder:null,
          status:"Order Placed",
          closed:false
        });
        newOrder.save().then(() => {
          findUser.cartList = [];
          findUser.ordersList.push(newOrder);
          findUser.save().then(()=>{
            res.send({ orderPlaced: true });
          })
        });
    }
    else{
      res.send({ orderPlaced: false});
  
    }
   } catch (e) {
    console.log("error in placing order " + e.message) 
   }
  };



  exports.confirmOrder = async (req,res)=>{
    let data = req.body;
    let findUser = await User.findOne({ id: req.cookies.rol });
    if(findUser){
      let orderToConfirm = await order.findOne({_id:data.id});
      orderToConfirm.closed = true;
      orderToConfirm.status = "Confirmed";
      orderToConfirm.save().then(()=>{
        res.send({confirmed:true})
      })
    }
  };