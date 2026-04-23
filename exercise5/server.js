const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const session = require('express-session');

const app = express();
app.use(express.json());

// Session setup
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const SECRET_KEY = "jwt-secret";

// Dummy users
const users = [
    { id: 1, username: "anjali", password: "1234" }
];


// 🔐 Serialize / Deserialize (for session)
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});


// ✅ Local Strategy (username + password)
passport.use('local', new LocalStrategy(
    (username, password, done) => {
        const user = users.find(u => u.username === username);

        if (!user) {
            return done(null, false, { message: "User not found" });
        }

        if (user.password !== password) {
            return done(null, false, { message: "Wrong password" });
        }

        return done(null, user);
    }
));


// ✅ JWT Strategy
passport.use('jwt', new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET_KEY
    },
    (payload, done) => {
        const user = users.find(u => u.id === payload.id);

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }
));


// 🔐 Session login (Local Strategy)
app.post('/auth/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(500).json({ message: "Error" });

        if (!user) {
            return res.status(401).json({ message: info.message });
        }

        req.login(user, (err) => {
            if (err) return res.status(500).json({ message: "Login failed" });

            return res.json({ message: "Logged in (session)", user });
        });
    })(req, res, next);
});


// 🔑 API login (JWT)
app.post('/auth/api-login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);

    if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET_KEY,
        { expiresIn: '1h' }
    );

    res.json({ token });
});


// 🛡 Session protected route
app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Login required" });
    }

    res.json({
        message: "Welcome to dashboard",
        user: req.user
    });
});


// 🛡 JWT protected route
app.get('/api/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            message: "Profile data",
            user: req.user
        });
    }
);


// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});