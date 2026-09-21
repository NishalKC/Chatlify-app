require("dotenv").config()


const http = require("http")
const app = require("./app")
const connectDB = require("./config/db")
const {Server} = require("socket.io")
connectDB()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173/",
        credentials: true
    }
})

io.on("connection",(server) => {
    console.log("User connected", socket.id);

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        
    }
    )
    
}
)

Port = process.env.PORT
app.listen(Port, () => {
    console.log(`server is running at port ${Port}`);
    
}
)