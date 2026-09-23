const userModel = require("../models/user")
const jwt = require("jsonwebtoken")

const protect = async(req, res , next )=>{
    try{
        let token = req.cookies.token 

        if(!token| token ==="" ){
            return res.status(401).json({
                message: "You must be login first"
            })
        }
        let  decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await userModel.findOne({_id: decoded.userId}).select("-password")

        next()
    }catch(error){
        return res.json({
            message: error.message
        })
    }
}

module.exports = protect