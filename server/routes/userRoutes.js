const express = require("express")
const Router = express.Router()

const { register, login, logout, GetME } = require("../controllers/authcontroller")
const protect = require("../middleware/authMiddleware")

Router.post("/register", register)
Router.post("/login", login)
Router.post("/logout", logout)
Router.get("/me",protect,GetME )

module.exports = Router