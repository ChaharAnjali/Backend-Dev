import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cartRoutes from "./routes/cart.routes.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: "cartSecret",
    resave: false,
    saveUninitialized: true
}));

app.set("view engine", "ejs");

app.use("/", cartRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});