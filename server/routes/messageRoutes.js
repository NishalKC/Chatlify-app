const express = require("express")
const { sendmessage, getmessage } = require("../controllers/messagecontroller")
const protect = require("../middleware/authMiddleware")
const Route= express.Router()

Route.post("/send", protect ,sendmessage)
Route.get("/:conversationId", protect ,getmessage)

module.exports = Route