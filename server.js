const express = require("express");
const app = express();
app.use(express.static("React/build"));
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
app.use(cookieParser());
var bodyParser = require("body-parser");
app.use(bodyParser.json());
let arrUsr = [];
mongoose.connect(
  "mongodb://mosaabrkia:bgx4RDT4dQeOuaLr@cluster0-shard-00-00.mt1zh.mongodb.net:27017,cluster0-shard-00-01.mt1zh.mongodb.net:27017,cluster0-shard-00-02.mt1zh.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-4upmps-shard-0&authSource=admin&retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
//bgx4RDT4dQeOuaLr

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to DB");
});
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
//user Schema
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

/////////////////////////////////////////////// METHODS ///////////////////////////////////////////////////////////////////

function newUID() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function newIdOrder() {
  return "*" + Math.random().toString(36).substr(2, 150);
}

/////////////////////////////////////////////// USER ///////////////////////////////////////////////////////////////////

// register
app.post("/Register", async (req, res) => {
  const newUsr = req.body;
  let newId = newUID();

  const checkExits = await User.findOne({ Email: newUsr.email });
  if (!checkExits) {
    const newUser = new User({
      id: newId,
      FirstName: newUsr.firstName,
      LastName: newUsr.lastName,
      Email: newUsr.email,
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
});

//login / logout
app.get('/logout',(req, res)=>{
      res.cookie("rol", ""); 
       res.send({logout:true})


})
app.post("/login", async (req, res) => {
  const checkUsr = req.body;

  let checkExits = await User.findOne({
    Email: checkUsr.loginEmail,
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
});

//get first _ last name in profile page
app.get("/userName", async (req, res) => {
  let idSearch = req.cookies.rol;
  let findUser = await User.findOne({ id: idSearch });
  if (findUser) {
    res.send({ FirstName: findUser.FirstName, LastName: findUser.LastName });
  } else {
    res.send({ found: false });
  }
});

// change email
app.post("/changeEmail", async (req, res) => {
  const emails = req.body;
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
});

// change password
app.post("/changePassword", async (req, res) => {
  const passwords = req.body;
  let idSearch = req.cookies.rol;
  let findUser = await User.findOne({
    id: idSearch,
    Password: passwords.oldPassword,
  });
  if (findUser) {
    findUser.Password = Password.newPassword;
    findUser.save().then(() => {
      res.send({ changed: true });
    });
  } else {
    res.send({ changed: false });
  }
});

//////////////////////////////////////////////// SHOP ITEMS /////////////////////////////////////////////////////////////////

app.post("/getAllItems", (req, res) => {
  let catalog = req.body;
  Item.find({ type: catalog.type }, (err, e) => {
    res.send(e);
  });
});

//////////////////////////////////////////////// cart /////////////////////////////////////////////////////////////////

app.get("/get-CartList", async (req, res) => {
  let idSearch = req.cookies.rol;
  let findUser = await User.findOne({ id: idSearch });
  if (findUser) {
    res.send({ cartList: findUser.cartList });
  }
});

app.post("/add-CartList", async (req, res) => {
  let idOfItem = req.body;
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
});

app.get("/gettotalCart", async (req, res) => {
  let idOfUser = req.cookies.rol;
  let findUser = await User.findOne({ id: idOfUser });
  let total = 0;
  if (findUser) {
    !!findUser.cartList &&
      findUser.cartList.map((e) => {
        total += e.item.price * e.quantity;
      });
  }
  res.send({ total });
});

app.post("/changeQuantity", async (req, res) => {
  const data = req.body;
  let idOfUser = req.cookies.rol;
  let findUser = await User.findOne({ id: idOfUser });
  let findItem = await Item.findOne({ id: data.id });
let cartList = findUser.cartList.map(e=>{if(e.id == data.id)e.quantity=data.quantity})
let objn = {item:findItem,id:findItem.id,quantity:data.quantity}
 User.updateOne({'cartList.id':data.id},{'$set':{'cartList.$':objn}}).then(()=>{
  console.log("saved")
})
});


app.post("/remove-CartList", async (req, res) => {
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
});

//////////////////////////////////////items//////////////////////////////
app.post("/LoadPageItem", async (req, res) => {
  const ItemId = req.body;
  let item = Item.findOne({ id: ItemId.ItemId });
  if (item) {
    await res.cookie("itemView", ItemId.ItemId);
    res.send({ found: true });
  } else {
    res.send({ found: false });
  }
});

app.get("/getItem", async (req, res) => {
  let idSearch = await req.cookies.itemView;
  if (req.cookies.itemView) {
    idSearch = await req.cookies.itemView;
  }
  let item = await Item.findOne({ id: idSearch });
  if (item) {
    res.send({ item });
  }
});

//////////////////////////////////////////////wish list
app.get("/get-wishList", async (req, res) => {
  let idSearch = req.cookies.rol;
  let findUser = await User.findOne({ id: idSearch });
  if (findUser) {
    res.send({ wishList: findUser.wishList });
  }
});

app.post("/add-wishList", async (req, res) => {
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
});

app.post("/remove-wishList", async (req, res) => {
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
});
///////////////////////orders//////////////////////
app.get('/getAllOrders',async(req,res)=>{
  let idSearch = req.cookies.rol;
  let findUser = await User.findOne({id:idSearch});
if(findUser && findUser.rank == "admin"){
  try {
    order.find({},(err,e)=>{
      try {
        res.send({orders:e})
      } catch (error) {
        throw new error("Error sending orders")
      }
    })
  } catch (error) {
    throw new error("Error sending orders")
  }
}
})
app.get("/createNewOrder", async (req, res) => {
  let idSearch = req.cookies.rol;
  let findUser = await User.findOne({ id: idSearch });
  let today = new Date().toISOString().slice(0, 10)
  // let today = new Date().toLocaleDateString()
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
  // if (findUser) {
  //   let newOrd = findUser.cartList;
  //   let idNew = newIdOrder();
  //   findUser.ordersList.push({ id: idNew, List: newOrd });
  //   findUser.cartList = [];
  //   findUser.save().then(() => {
  //     res.send({ orderPlace: true });
  //   });
  // } else {
  //   res.send({ orderPlace: false });
  // }
});

app.post('/confirmOrder',async (req,res)=>{
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
})

app.get('/getPlacedOrders',async (req,res)=>{
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

})

// app.get("/getPlacedOrders1", async (req, res) => {
//   let idOfUser = req.cookies.rol;
//   let findUser = await User.findOne({ id: idOfUser });
//   if (findUser) {
//     res.send({ List: findUser.ordersList });
//   } else {
//     res.send({ List: [] });
//   }
// });

////////////////////////////////admin
app.post("/changeStatus",async(req,res)=>{
  const data = req.body;
  let idOfUser = req.cookies.rol;
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

  
})
app.post('/userName',async (req,res)=>{
  const data = req.body;
  let idOfUser = req.cookies.rol;
  let findUser = await User.findOne({ id: idOfUser });
  if(findUser && findUser.rank == "admin"){
 
      const user = User.find({ id:data.id},(err,e)=>{
        let fullName = e[0].FirstName + " " + e[0].LastName
        res.send({fullName})
      })
      
    

    
  }
})
app.post("/removeItem1", async (req, res) => {
  const idItem = req.body;
  let idOfUser = req.cookies.rol;
  let findUser = await User.findOne({ id: idOfUser });
  if (findUser && findUser.rank == "admin") {
    let itemToClear = await Item.findOne({ id: idItem.id });
    if (itemToClear) {
      Item.deleteOne(itemToClear).then(() => res.send({ deleted: true }));
    } else {
      res.send({ deleted: false });
    }
  } else {
    res.send({ deleted: null });
  }
});

app.post("/addItem", async (req, res) => {
  const itemInfo = req.body;
  let idOfUser = req.cookies.rol;
  let findUser = await User.findOne({ id: idOfUser });
  if (findUser && findUser.rank == "admin") {
    let findItem = await Item.findOne({ id: itemInfo.id });
    // soon make auto id
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
});

app.get("/getAllItemsShop", (req, res) => {
  Item.find({}, (err, e) => {
    res.send(e);
  });
});

app.post("/changePriceItem", async (req, res) => {
  let Details = req.body;
  let idOfUser = req.cookies.rol;
  let findUser = await User.findOne({ id: idOfUser });
  let Item1 = await Item.findOne({ id: Details.id });
  if (Item1 && findUser && findUser.rank == "admin") {
    Item1.price = Details.price;
    Item1.save();
    res.send({ updated: true });
  } else {
    res.send({ updated: false });
  }
});

app.post("/removeItem", async (req, res) => {
  console.log("Details");
  let Details = req.body;
  console.log(Details);
  let idOfUser = req.cookies.rol;
  let findUser = await User.findOne({ id: idOfUser });
  let Itemfound = await Item.findOne({ id: Details.id });
  if (Itemfound && findUser && findUser.rank == "admin") {
    Item.deleteOne(Itemfound).then(() => res.send({ removed: true }));
  } else {
    res.send({ removed: false });
  }
});

/**
 * sort less to high price
     Item.find({},(err,e)=>{
      res.send(e)
    }).sort({price:1}

    * sort high to less price
     Item.find({},(err,e)=>{
      res.send(e)
    }).sort({price:-1}
 */

app.post("/SearchAdminPage", (req, res) => {
  const data = req.body;
  let arr = []
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
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log("listening", port);
});
