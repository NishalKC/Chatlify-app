const { Server } = require("socket.io");

let io;
const onlineUsers = new Map();

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("user-online", (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit("online-users", [...onlineUsers.keys()])
    });

    socket.on("send-message", ({ receiverId, message }) => {
      const receiverSocket = onlineUsers.get(receiverId);

      console.log("Receiver Socket:", receiverSocket);

      if (receiverSocket) {
        io.to(receiverSocket).emit("receive-message", message);
      }
    });
    socket.on("typing", ({receiverId}) => {
      let receiverSocket = onlineUsers.get(receiverId)
      if(receiverSocket){
        io.to(receiverId).emit("typing")
      }
    }
    )
    socket.on("stop-typing", ({ receiverId }) => {
    const receiverSocket = onlineUsers.get(receiverId);

    if(receiverSocket){
        io.to(receiverSocket).emit("stop-typing");
    }
});
    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
    });
  });
};

const getIO = () => io;

module.exports = {
  initializeSocket,
  getIO,
  onlineUsers,
};