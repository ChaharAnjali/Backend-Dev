import jwt from "jsonwebtoken";

const otpStore = new Map(); // temporary storage

export const saveOTP = (userId, otp) => {
    otpStore.set(userId, otp);

    // OTP expire after 5 min
    setTimeout(() => otpStore.delete(userId), 5 * 60 * 1000);
};

export const verifyMFA = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const { otp } = req.body;

        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }

        // verify JWT
        const decoded = jwt.verify(token, "secretkey");

        const storedOtp = otpStore.get(decoded.id);

        if (!otp || storedOtp !== otp) {
            return res.status(403).json({ message: "Invalid OTP" });
        }

        req.user = decoded;
        next();

    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};