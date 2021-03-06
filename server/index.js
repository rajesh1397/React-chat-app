const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

server.listen(3001, () => {
  console.log("listening");
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("joinroom", (data) => {
    socket.join(data);
  });

  socket.on("sendmessage", (data) => {
    socket.to(data.room).emit("receivemsg", data);
  });
});
