const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());

// Session setup
app.use(session({
    secret: 'auth-secret',
    resave: false,
    saveUninitialized: false
}));

// In-memory data
const users = [
    { id: 1, username: "user1", role: "user" },
    { id: 2, username: "mod1", role: "moderator" },
    { id: 3, username: "admin1", role: "admin" }
];

const posts = [];

//  Dummy login (for testing)
app.post('/login', (req, res) => {
    const { username } = req.body;

    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    req.session.user = user;
    res.json({ message: "Logged in", user });
});


//  Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized. Please login." });
    }
    next();
};


//  Role-based middleware
const requireRole = (role) => {
    return (req, res, next) => {
        const user = req.session.user;

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Admin can access everything
        if (user.role === "admin") {
            return next();
        }

        if (user.role !== role) {
            return res.status(403).json({ message: "Forbidden: insufficient permissions" });
        }

        next();
    };
};


//  Ownership OR Moderator/Admin
const isOwnerOrModerator = (req, res, next) => {
    const user = req.session.user;
    const postId = parseInt(req.params.id);

    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    // Owner
    if (post.userId === user.id) {
        return next();
    }

    // Moderator or Admin
    if (user.role === "moderator" || user.role === "admin") {
        return next();
    }

    return res.status(403).json({
        message: "Forbidden: You can only edit your own post"
    });
};


//  Create Post (any logged-in user)
app.post('/posts', isAuthenticated, (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: "Content required" });
    }

    const newPost = {
        id: posts.length + 1,
        content,
        userId: req.session.user.id
    };

    posts.push(newPost);

    res.status(201).json({ message: "Post created", post: newPost });
});


//  Edit Post
app.put('/posts/:id', isAuthenticated, isOwnerOrModerator, (req, res) => {
    const postId = parseInt(req.params.id);
    const { content } = req.body;

    const post = posts.find(p => p.id === postId);

    post.content = content;

    res.json({ message: "Post updated", post });
});


//  Delete Post (moderator or admin)
app.delete('/posts/:id', isAuthenticated, requireRole('moderator'), (req, res) => {
    const postId = parseInt(req.params.id);

    const index = posts.findIndex(p => p.id === postId);

    if (index === -1) {
        return res.status(404).json({ message: "Post not found" });
    }

    posts.splice(index, 1);

    res.json({ message: "Post deleted" });
});


// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});