import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.set("view engine", "ejs");

// Middleware to get language from cookie
app.use((req, res, next) => {
    req.lang = req.cookies.lang || "en";
    next();
});

// Home route
app.get("/", (req, res) => {
    const messages = {
        en: {
            title: "Welcome",
            text: "Hello! This is your language preference system."
        },
        hi: {
            title: "स्वागत है",
            text: "नमस्ते! यह आपका भाषा चयन सिस्टम है।"
        }
    };

    res.render("index", {
        lang: req.lang,
        content: messages[req.lang]
    });
});

// Set language
app.get("/lang/:lang", (req, res) => {
    const lang = req.params.lang;

    // Set cookie (expires in 7 days)
    res.cookie("lang", lang, { maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});