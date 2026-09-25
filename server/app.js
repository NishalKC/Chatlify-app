const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")

const userRoute = require("./routes/userRoutes")
const conversationRoute = require("./routes/conversationRoutes")
const messageRoute = require("./routes/messageRoutes")

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use("/user", userRoute)
app.use("/conversation", conversationRoute)
app.use("/message", messageRoute)

app.get("/", (req, res ) => {
    res.json({
        message: "Chatlify api is running"
    })
}
)

module.exports = app