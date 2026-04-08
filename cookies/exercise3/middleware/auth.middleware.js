export const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.send("Access denied. Please login.");
    }
};

export const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === "admin") {
        next();
    } else {
        res.send("Access denied. Admins only.");
    }
};