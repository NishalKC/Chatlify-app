const dotenv = require("dotenv")

const app = require("./app")
const http = require("http")

dotenv.config()
const ConnectDB = require("./config/db")

const server = http.createServer(app)
ConnectDB()

const Port = process.env.PORT || 5000;

server.listen(Port, () => {
    console.log(`server is running in port : ${Port}`);
}
)