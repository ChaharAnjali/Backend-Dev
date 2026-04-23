const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

// Dummy users (password = hashed "1234")
const users = [
    { email: "anjali@gmail.com", password: "$2b$10$wH1pKz0d8Yw8Z2q3yXyN0eXH5WnKxkXW3c7JY6x0c3KpYpXy8Qh5K" }
];

// email -> { count, lockUntil }
const loginAttempts = new Map();

const MAX_ATTEMPTS = 5;
const LOCK_TIME = 30 * 60 * 1000; // 30 min
const WINDOW_TIME = 60 * 60 * 1000; // 1 hour


// 🔍 Check login attempts
function checkLoginAttempts(email) {
    const attempt = loginAttempts.get(email);

    if (!attempt) return null;

    // If locked
    if (attempt.lockUntil && attempt.lockUntil > Date.now()) {
        return {
            locked: true,
            remainingTime: Math.ceil((attempt.lockUntil - Date.now()) / 1000)
        };
    }

    return { locked: false };
}


// ❌ Record failed attempt
function recordFailedAttempt(email) {
    let attempt = loginAttempts.get(email);

    if (!attempt) {
        attempt = { count: 0, firstAttempt: Date.now(), lockUntil: null };
    }

    // Reset window after 1 hour
    if (Date.now() - attempt.firstAttempt > WINDOW_TIME) {
        attempt.count = 0;
        attempt.firstAttempt = Date.now();
        attempt.lockUntil = null;
    }

    attempt.count++;

    // Lock account
    if (attempt.count >= MAX_ATTEMPTS) {
        attempt.lockUntil = Date.now() + LOCK_TIME;
    }

    loginAttempts.set(email, attempt);
}


// ✅ Clear attempts on success
function clearAttempts(email) {
    loginAttempts.delete(email);
}


// 🔐 Login API
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check lock
    const status = checkLoginAttempts(email);
    if (status && status.locked) {
        return res.status(403).json({
            message: `Account locked. Try again in ${status.remainingTime} seconds`
        });
    }

    const user = users.find(u => u.email === email);

    if (!user) {
        recordFailedAttempt(email);
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        recordFailedAttempt(email);
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Success
    clearAttempts(email);

    res.json({ message: "Login successful" });
});


// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});