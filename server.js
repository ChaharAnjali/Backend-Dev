const express = require("express");
const app = express();
const PORT = 5000;

// To serve static files (CSS, JS, images)
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/form.html"); 
    res.send("Hello")
});

app.post("/students/register", (req, res) => {
    console.log("form data:", req.body);
    res.send("Registered Successfully");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
