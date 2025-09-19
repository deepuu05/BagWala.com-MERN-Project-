const express = require('express')
const router = express.Router();
const ownerModel = require("../models/owner-model")

router.get('/admin', function (req, res) {
    // res.send("hey i am working properly")
    let success = req.flash("success")
    res.render("createproducts",{success})

})
// node ka environment bhi use kr saktye hai : for production
// console.log(process.env.NODE_ENV)

// if(process.env.NODE_ENV==="development"){
router.post("/create", async function (req, res) {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
        return res
            .status(503)
            .send('You do not have permission to create a new owner');
    }

    let { fullname, email, password } = req.body;
    let createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
    })
    res.status(201).send("we can create a owner")
})
// }

module.exports = router;