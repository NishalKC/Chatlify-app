const mongoose = require("mongoose")

const mongodburl = process.env.MONGODBURL

const connectDB = () => {
    try{
        mongoose.connect(mongodburl)
        console.log("mongoDB connected sucessfully");
        
    }catch(err){
        console.log("mongoDB connection failed");
        console.log(err.message)
        
        process.exit(1)
        
        
    }
}

module.exports = connectDB
