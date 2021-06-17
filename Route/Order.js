var cookieParser = require("cookie-parser");
const express = require('express')
const router = require("express").Router();
const app = express();
app.use(cookieParser());
const orderController = require("../Controller/order");

router.route('/getPlacedOrders').get(orderController.getPlacedOrders);


module.exports = router;