import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/activity-tracker")
    .then(() => console.log("MongoDB connected"))
    .catch(() => console.log("DB error"));

app.use("/api", userRoutes);

app.listen(5000, () => {
    console.log("Server running on 5000");
});