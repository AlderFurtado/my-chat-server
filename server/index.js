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

let players = [];

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("logIn", (player) => {
    console.log(`player ${socket.id} is connected`);

    if (players.find((player) => player == socket.id)) {
      return socket.emit("you already connected");
    }

    const newPlayer = { ...player, socket_id: socket.id };
    players.push(newPlayer);

    socket.emit("user.registered", { ...newPlayer, isRegistered: true });
    io.emit("allPlayers", players);
    console.log(players);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen("3002", () => {
  console.log("Server is listening on port 3002");
});
