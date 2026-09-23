const userModel = require("../models/user")
const bcrypt = require("bcrypt")
const generateToken = require("../utils/generateToken")

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


        let hashedpassword = await  bcrypt.hash(password , 10)
        const user = await userModel.create({
            fullname, 
            username,
            email,
            password: hashedpassword
        })
        let token = generateToken(user)
        res.cookie("token", token,{
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            message: "user created sucesfully",
            user
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports.login=  async(req, res)=>{
try{

    let{email, password} = req.body
    let user = await userModel.findOne({email})
    if(!user){
        return res.status(401).json({
            message: "email or password is incorrect"
        })
    }

    let match=await bcrypt.compare(password , user.password)
    if(!match){
        return res.status(401).json({
            message: "email or password is incorrect"
        })
    }

    let token = generateToken(user)
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
        message: "login sucessfully",
        user
    })

}catch(error){
    return res.status(500).json({
        message: error.message
    })
}
}

module.exports.logout = (req, res)=>{
    res.clearCookie("token")
    return res.json({
        message: "logout sucessfully"
    })
}

module.exports.GetME= (req, res ) => {
    try{
        return res.json({
            user: req.user
        })
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}
