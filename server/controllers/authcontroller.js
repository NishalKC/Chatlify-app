const userModel = require("../models/user")
const bcrypt = require("bcrypt")

module.exports.register= async(req , res ) => {
    try {
        let{fullname, username, email, password}= req.body

        if(!fullname | !username | !email | !password ){
            return res.status(422 ).json({
                message: "all fields are required"
            })
        }

        const existinguser= await userModel.findOne({email})
        if(existinguser){
            return res.status(400).json({
                message: "user alredy exists"
            })
        }


        let hashedpassword = bcrypt.hash(password , 10)
        const user = await userModel.create({
            fullname, 
            username,
            email,
            password: hashedpassword
        })

        return res.status().json({
            message: "user created sucesfully",
            user
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
