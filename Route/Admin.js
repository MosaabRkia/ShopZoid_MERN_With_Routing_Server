var cookieParser = require("cookie-parser");
const express = require('express')
const router = require("express").Router();
const app = express();
app.use(cookieParser());
const adminController = require("../Controller/admin");

router.route('/AdminOrNot').get(adminController.AdminOrNot); 
router.route('/changeStatus').post(adminController.changeStatus);
router.route('/userName').post(adminController.changeStatus);
router.route('/getAllOrders').get(adminController.getAllOrders);
router.route('/getUserName').post(adminController.getUserName);
router.route('/SearchAdminPage').post(adminController.SearchAdminPage ); 
router.route('/removeItem').post(adminController.removeItem);
router.route('/changePriceItem').post(adminController.changePriceItem);
router.route('/getAllItemsShop').get(adminController.getAllItemsShop);
router.route('/addItem').post(adminController.addItem );

module.exports = router;

