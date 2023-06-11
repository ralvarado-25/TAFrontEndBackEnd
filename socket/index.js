import { Server } from "socket.io";
import { instrument } from '@socket.io/admin-ui';

const io = new Server({
  cors: {    
    origin: ["https://admin.socket.io", "http://localhost:3000", "http://10.201.0.98:3000"],
    credentials: true
  },
});

instrument(io, {
  auth: false,
  mode: "development",
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  console.log(username);
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  console.log("conexion")
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });

  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
      type,
    });
  });

  socket.on("sendMessage", ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getMessage", {
      senderName,
      type,
    });
  });

  socket.on("sendText", ({ senderName, receiverName, text }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getText", {
      senderName,
      text,
    });
  });

  socket.on("disconnect", () => {
    console.log("desconexion")
    removeUser(socket.id);
  });
});

io.listen(3001);
