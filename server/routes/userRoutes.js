const express = require("express")
const { register } = require("../controllers/authcontroller")
const Router = express.Router()

Router.post("/register", register)

module.exports = Router