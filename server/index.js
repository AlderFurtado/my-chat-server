const express = require("express");
let app = express();
const cors = require("cors");

app.use(express.static("."));

app.use(cors());

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.listen("3002", () => {
  console.log("Server is listening on port 3002");
});
