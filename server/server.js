const dotenv = require("dotenv")
dotenv.config()

const app = require("./app")
const http = require("http")

const ConnectDB = require("./config/db")
const {  initializeSocket } = require("./socket/socket")

const server = http.createServer(app)
ConnectDB()

initializeSocket(server)
const Port = process.env.PORT || 5000;

server.listen(Port, () => {
    console.log(`server is running in port : ${Port}`);
}
)