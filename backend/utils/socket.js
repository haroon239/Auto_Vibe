

// utils/socket.js
const { Server } = require("socket.io");

const userSocketMap = {};
let io;

module.exports.initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    socket.on("disconnect", () => {
      console.log("socket disconnected:", socket.id);
      for (const [key, value] of Object.entries(userSocketMap)) {
        if (value === socket.id) {
          delete userSocketMap[key];
          break;
        }
      }
    });

    socket.on("sendmessage", (data, callback) => {
      const receiverSocketId = userSocketMap[data.receiver];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("message", data);
        callback({ success: true, message: "Message sent successfully." });
      } else {
        console.error("Receiver's socket not found.");
        callback({ success: false, message: "Receiver's socket not found." });
      }
    });
  });
};

module.exports.getSocketManager = () => ({ io, userSocketMap });