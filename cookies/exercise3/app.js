import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "adminSecret",
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs");

// Routes
app.use("/", authRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});