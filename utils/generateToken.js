const jwt = require("jsonwebtoken")

const generateToken=function (user){
//  let token =jwt.sign({email:user.email,id:user._id},"heyehe")
 let token =jwt.sign({email:user.email,id:user._id},process.env.JWT_KEY)
    return token; 
};
module.exports.generateToken = generateToken;