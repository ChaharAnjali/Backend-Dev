const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

// Temporary database (in-memory)
const users = [];

// Password validation function
function validatePassword(password) {
    const errors = [];

    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long");
    }

    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter");
    }

    if (!/[0-9]/.test(password)) {
        errors.push("Password must contain at least one number");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push("Password must contain at least one special character");
    }

    return errors;
}

// Register API
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if all fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields (username, email, password) are required"
            });
        }

        // Check duplicate email
        const userExists = users.find(user => user.email === email);
        if (userExists) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        // Validate password
        const passwordErrors = validatePassword(password);
        if (passwordErrors.length > 0) {
            return res.status(400).json({
                errors: passwordErrors
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const newUser = {
            username,
            email,
            password: hashedPassword
        };

        users.push(newUser);

        return res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});