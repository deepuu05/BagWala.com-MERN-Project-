const mongoose = require('mongoose')
const dbgr = require('debug')("development:mongoose")
// congif file require krni hai for production db connectivity: jiskyw liyw hum development.json file uthyge


mongoose.connect("mongodb://localhost:27017/bagwala")
.then(function(){  // connect ho jaye to ye chlyga
    // dbgr("connected")
    console.log("connected")

}).catch(function(err){// connect nhi hua to ye chlyga
    // dbgr(err)
   console.log(err)
})

module.exports = mongoose.connection;