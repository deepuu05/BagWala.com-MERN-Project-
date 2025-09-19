const userModel = require("../models/user-model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
    try {
        let { fullname, email, password } = req.body;

     let user =await userModel.findOne({email:email})
     if(user){
        return res.status(401).send("user already have an account")
     }
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message)
                else {
                    let createdUser = await userModel.create({
                        email,
                        fullname,
                        password: hash,
                    })

                    // let token =jwt.sign({email,id:createdUser._id},"heyehe")
                    let token =generateToken(createdUser);
                    res.cookie('token',token)
                    // res.send(token)
                    // res.send("User Created Succesfully")
                    res.redirect("/shop")
                }

            })
        })


    } catch (err) {
        //    console.log(err.message)
        res.send(err.message)
    }


};

module.exports.loginUser = async function(req,res){
    let {email,password}= req.body;
    let user = await userModel.findOne({email:email})
    if(!user) return res.send("Email and password is incorrect")
     
        bcrypt.compare(password,user.password,function(err,result){
            if(result){
                // res.send(result)
                let token = generateToken(user);
                res.cookie("token",token)
                // res.send("you can login")
                res.redirect("/shop")
                // res.render('shop')
            }
            else{
              return  res.send("Email and password is incorrect")
            }
        })

};
module.exports.logout = function(req,res){
    res.cookie("token","")
    res.redirect("/")
}
