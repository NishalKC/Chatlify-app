const express = require("express")
const { sendmessage, getmessage, seenmessage } = require("../controllers/messagecontroller")
const protect = require("../middleware/authMiddleware")
const Route= express.Router()
const upload = require("../config/Multer")

Route.post("/send", protect ,upload.single(),sendmessage)
Route.get("/:conversationId", protect ,getmessage)
Route.put("/seen", protect ,seenmessage)

module.exports = Route