const express = require("express")
const { Createconversation, Getconversation } = require("../controllers/conversationcontroller")
const protect= require("../middleware/authMiddleware")
const Route= express.Router()

Route.post("/create", protect,Createconversation)
Route.get("/all", protect ,Getconversation)

module.exports = Route