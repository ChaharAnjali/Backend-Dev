import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, "secretkey");

        req.user = decoded;  // 🔥 ye line sabse important hai
        next();

    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};