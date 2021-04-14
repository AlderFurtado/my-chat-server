const express = require("express");
let app = express();

app.use(express.static("."));

app.get("/", (req, res) => {
  res.json({ hello: "dss" });
});

app.listen("3000", () => {
  console.log("Server is listening on port 3000");
});
