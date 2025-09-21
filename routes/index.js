const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();
const productModel = require("../models/product-model");
const userModel = require('../models/user-model');
router.get('/', function (req, res) {
    // res.send("hey i am working properly")
    let error = req.flash("error");
    res.render("index",{error})

})
router.get("/shop",isLoggedIn, async function(req,res){
    let allproducts = await productModel.find()
    let success = req.flash("success");
    res.render("shop",{allproducts,success})
})
router.get("/cart",isLoggedIn, async function(req,res){
    res.render("cart")
   
})
router.get("/addtocart/:productid",isLoggedIn, async function(req,res){
        let user =await userModel.findOne({email:req.user.email})
        user.cart.push(req.params.productid);
        await user.save();
        req.flash("success","Added to Cart");
        req.redirect("/shop");
})
// router.get("/logout",function(req,res){

// })
module.exports = router;