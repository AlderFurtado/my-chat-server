const express = require("express");
let app = express();

app.use(express.static("."));

app.get("/", (req, res) => {
  res.json({ hello: "aaa" });
});

app.listen("3002", () => {
  console.log("Server is listening on port 3000");
});
