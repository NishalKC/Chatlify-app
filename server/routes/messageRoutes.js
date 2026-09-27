const express = require("express")
const { sendmessage, getmessage } = require("../controllers/messagecontroller")
const protect = require("../middleware/authMiddleware")
const Route= express.Router()
const upload = require("../config/Multer")

Route.post("/send", protect ,upload.single("image"),sendmessage)
Route.get("/:conversationId", protect ,getmessage)

module.exports = Route