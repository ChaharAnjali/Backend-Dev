import express from "express";
import { isAuthenticated, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Dummy users
const users = [
    { username: "admin", password: "1234", role: "admin" },
    { username: "user", password: "1234", role: "user" }
];

// Login page
router.get("/", (req, res) => {
    res.render("login");
});

// Login logic
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.send("Invalid credentials");
    }

    // Store in session
    req.session.user = user;

    res.redirect("/dashboard");
});

// Dashboard (protected)
router.get("/dashboard", isAuthenticated, (req, res) => {
    res.render("dashboard", { user: req.session.user });
});

// Admin panel (role-based protection)
router.get("/admin", isAuthenticated, isAdmin, (req, res) => {
    res.render("admin", { user: req.session.user });
});

// Logout
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

export default router;