const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("welcome to home page");
});

app.get("/users", (req, res) => {
  res.send("<h1>this is users page</h1>");
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`you are requesting for user: ${userId}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
