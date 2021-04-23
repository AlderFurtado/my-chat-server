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
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

let players = [];
let rooms = [];

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("logIn", (player) => logIn(player, socket));

  socket.on("checkRoom", (data) => {
    checkRoom(socket.id, data.socketId, io, socket);
  });

  socket.on("sendMessage", (data) =>
    sendMessage(io, data.roomId, data.message, socket.id)
  );

  socket.on("disconnect", disconnect);
});

const logIn = (player, socket) => {
  console.log(`player ${socket.id} is connected`);

  if (players.find((player) => player == socket.id)) {
    return socket.emit("you already connected");
  }

  const newPlayer = { ...player, socketId: socket.id };
  players.push(newPlayer);

  socket.emit("user.registered", { ...newPlayer, isRegistered: true });
  io.emit("allPlayers", players);
  console.log(players);
};

const checkRoom = (socketIdUser, socketIdGuess, io, socket) => {
  const room = rooms.find(
    (room) =>
      room.socketIdUser === socketIdUser && room.socketIdGuess === socketIdGuess
  );
  if (room) {
    socket.emit("getRoom", room.id);
    return;
  }

  const newRoom = {
    id: rooms.length,
    socketIdUser: socketIdUser,
    socketIdGuess: socketIdGuess,
    messages: [],
  };

  rooms.push(newRoom);

  socket.join(newRoom.id.toString());
  socket.emit("getRoom", newRoom.id);
  console.log("rooms", rooms);
};

const sendMessage = (io, roomId, content, senderId) => {
  const room = rooms.find((room) => room.id == roomId);
  const message = {
    content,
    senderId,
    dateAt: new Date(),
  };
  room.messages.push(message);
  io.to(room.id).emit("newPrivateMessage", message);
  console.log(rooms);
};

const disconnect = () => {
  console.log("Client disconnected");
};

server.listen("3002", () => {
  console.log("Server is listening on port 3002");
});
