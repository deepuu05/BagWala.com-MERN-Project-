const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();
const productModel = require("../models/product-model")
router.get('/', function (req, res) {
    // res.send("hey i am working properly")
    let error = req.flash("error");
    res.render("index",{error})

})
router.get("/shop",isLoggedIn, async function(req,res){
    let allproducts = await productModel.find()
    res.render("shop",{allproducts})
})
// router.get("/logout",function(req,res){

// })
module.exports = router;