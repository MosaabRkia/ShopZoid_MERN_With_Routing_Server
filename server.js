const express = require("express");
const router = require("express").Router();
const app = express();
app.use(express.static("React/build"));
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
app.use(cookieParser());
var bodyParser = require("body-parser");
app.use(bodyParser.json());


const user = require("./Route/User");
app.use("/user", user);

const item = require("./Route/Item");
app.use("/item", item);

const order = require("./Route/Order");
app.use("/order", order);

const Admin = require("./Route/Admin");
app.use("/admin", Admin);

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




////////////////////////////////admin







// app.post("/removeItem1", async (req, res) => {
//   const idItem = req.body;
//   let idOfUser = req.cookies.rol;
//   let findUser = await User.findOne({ id: idOfUser });
//   if (findUser && findUser.rank == "admin") {
//     let itemToClear = await Item.findOne({ id: idItem.id });
//     if (itemToClear) {
//       Item.deleteOne(itemToClear).then(() => res.send({ deleted: true }));
//     } else {
//       res.send({ deleted: false });
//     }
//   } else {
//     res.send({ deleted: null });
//   }
// });



const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log("listening", port);
});
