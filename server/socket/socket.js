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
    });

    socket.on("send-message", ({ receiverId, message }) => {
      const receiverSocket = onlineUsers.get(receiverId);

      console.log("Receiver Socket:", receiverSocket);

      if (receiverSocket) {
        io.to(receiverSocket).emit("receive-message", message);
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