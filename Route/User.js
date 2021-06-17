var cookieParser = require("cookie-parser");
const express = require('express')
const router = require("express").Router();
const app = express();
app.use(cookieParser());
const userController = require("../Controller/user");



router.route("/register").post(userController.register);
router.route('/logout').get(userController.logout);
router.route('/login').post(userController.login);
router.route('/userName').get(userController.userName);
router.route('/changeEmail').post(userController.userName);
router.route('/changePassword').post(userController.changePassword);
router.route('/cartList').get(userController.cartList);
router.route('/gettotalCart').get(userController.gettotalCart);
router.route('/addCartList').post(userController.addCartList);
router.route('/changeQuantity').post(userController.changeQuantity);
router.route('/removeCartList').post(userController.removeCartList);
router.route('/getWishList').get(userController.getWishList); 
router.route('/addWishList').post(userController.addWishList);
router.route('/removeWishList').post(userController.removeWishList);
router.route('/createNewOrder').get(userController.createNewOrder);  
router.route('/confirmOrder').get(userController.confirmOrder); 


module.exports = router;