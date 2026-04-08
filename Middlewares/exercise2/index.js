import express from "express";
import secureRoutes from "./routes/secure.routes.js";

const app = express();

app.use(express.json());

app.use("/api", secureRoutes);

app.listen(5000, () => {
    console.log("Server running on 5000");
});

