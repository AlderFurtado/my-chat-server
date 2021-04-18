const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  // ...
});

io.on("connection", (socket) => {
  socket.on("connect", () => {
    console.log("connectado");
  });
});

app.listen("3002", () => {
  console.log("Server is listening on port 3002");
});
