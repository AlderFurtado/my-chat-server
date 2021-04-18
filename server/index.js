const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

const httpServer = require("http");
const server = httpServer.createServer(app);

const socketIO = require("socket.io");

const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const players = [];

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("logIn", () => {
    console.log(`player ${socket.id} is connected`);
    players.push(socket.id);
    console.log(players);
    socket.emit("allPlayers", players);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen("3002", () => {
  console.log("Server is listening on port 3002");
});
