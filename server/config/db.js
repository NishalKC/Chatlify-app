const mongoose = require("mongoose")

const ConnectDB = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI)
        console.log("mongoDB connected sucessfully");
        
    } catch (error) {
        console.log("mongoDB connection failed");
        console.log(error.message)
        
        process.exit(1)
        
        
    }
}

module.exports = ConnectDB
