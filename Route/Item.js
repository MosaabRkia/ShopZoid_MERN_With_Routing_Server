var cookieParser = require("cookie-parser");
const express = require('express')
const router = require("express").Router();
const app = express();
app.use(cookieParser());
const itemController = require("../Controller/item");

router.route('/getAllItems').post(itemController.getAllItems);
router.route('/getItem').post(itemController.getItem);


module.exports = router;

