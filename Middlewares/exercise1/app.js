const express = require("express");
const logger = require("./middleware/logger");

const app = express();

// middleware use
app.use(logger);

app.get("/", (req, res) => {
    res.send("Hello Anjali 👋");
});

app.get("/test", (req, res) => {
    res.send("Test Route");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});