import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import formRoutes from "./routes/form.routes.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Session setup
app.use(session({
    secret: "secretKey123",
    resave: false,
    saveUninitialized: true
}));

// View engine
app.set("view engine", "ejs");

// Routes
app.use("/", formRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});