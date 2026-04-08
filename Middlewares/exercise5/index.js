import express from "express";
import { sanitizeInput } from "./middleware/sanitize.middleware.js";

const app = express();

app.use(express.json());

// 🔥 middleware apply
app.use(sanitizeInput);

app.post("/test", (req, res) => {
    res.json({
        sanitizedData: req.body
    });
});

app.listen(5000, () => {
    console.log("Server running on 5000");
});