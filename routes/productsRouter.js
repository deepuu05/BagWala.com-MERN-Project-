const express = require('express')
const router = express.Router();
const upload = require("../config/multer-config")
const productModel = require("../models/product-model")

// router.get('/',function(req,res){
//     res.send("hey i am working properly")

// }) 
router.post('/create', upload.single("image"), async function (req, res) {
    // res.send("hey i am working properly")
    // res.send(req.file)
    try{
    let {
        // image, vo nhi lengye kyunki multer se kr di hai
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor } = req.body;

    let createdProduct = await productModel.create({

        image: req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor,
    })
    // res.send(createdProduct)
    req.flash("success","Product Created Successfully")
    res.redirect("/owners/admin")
}catch(err){
    res.send(err.message)
}

})
module.exports = router;