const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const ACCESS_SECRET = 'access-secret';
const REFRESH_SECRET = 'refresh-secret';

// Dummy users
const users = [
    { id: 1, username: "anjali" }
];

// Store refresh tokens
const refreshTokens = new Set();


// 🔑 Generate Access Token (15 min)
function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_SECRET, { expiresIn: '15m' });
}


// 🔄 Generate Refresh Token (7 days)
function generateRefreshToken(user) {
    const token = jwt.sign(user, REFRESH_SECRET, { expiresIn: '7d' });
    refreshTokens.add(token); // store token
    return token;
}


// 🔐 Login
app.post('/login', (req, res) => {
    const { username } = req.body;

    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({
        accessToken,
        refreshToken
    });
});


// 🔄 Refresh Token Endpoint
app.post('/token/refresh', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ message: "Refresh token required" });
    }

    if (!refreshTokens.has(token)) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }

    jwt.verify(token, REFRESH_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token expired or invalid" });
        }

        const accessToken = generateAccessToken({ id: user.id, username: user.username });

        res.json({ accessToken });
    });
});


// 🚪 Logout (invalidate refresh token)
app.post('/logout', (req, res) => {
    const { token } = req.body;

    refreshTokens.delete(token);

    res.json({ message: "Logged out successfully" });
});


// 🛡 Protected Route
app.get('/protected', (req, res) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access token required" });
    }

    jwt.verify(token, ACCESS_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        res.json({
            message: "Protected data accessed",
            user
        });
    });
});


// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});