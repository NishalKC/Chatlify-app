const {Server } = require("socket.io")

let io
const onlineUsers = new Map()

module.exports.initilization = (server) => {
    io=  new Server(server,{
        cors:{
            origin: process.env.CLIENT_URL,
            credentials: true
        },
    })
}

io.on("connection", (socket) => {
    console.log("user Connected:",  socket.id);
    
    socket.on("user-online", (userId) => {
        onlineUsers.set(userId , socket.id)

        io.emit("online-user", [...onlineUsers.keys()])
    }
    )

    socket.on("disconnect", () => {
        for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit("online-users", [...onlineUsers.keys()])
      console.log("disconnect:", socket.id);
      

    }
    )
})

module.exports= {
    io,
    onlineUsers
}
