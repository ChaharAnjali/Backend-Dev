import express from "express";
import session from "express-session";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "timeoutSecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 1000 // 2 minutes session timeout
    }
}));

app.set("view engine", "ejs");

// Dashboard route
app.get("/dashboard", (req, res) => {
    if (!req.session.user) {
        req.session.user = { name: "Demo User" };
    }

    res.render("dashboard");
});

// Extend session (keep alive)
app.get("/keep-alive", (req, res) => {
    req.session.touch(); // refresh session expiry
    res.send("Session extended");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});