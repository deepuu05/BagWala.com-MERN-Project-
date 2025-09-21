const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    fullname :{
        type:String,
        minLength:3,
        trim:true
    },
    email: String,
    password:String,
    // cart : {
    //     type:Array,
    //     default:[]
    // },
    cart : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }],
    // isadmin : Boolean,
    orders:{
        type:Array,
        default: []
    },
    contact:Number,
    picture: String
});

module.exports = mongoose.model("user",userSchema)