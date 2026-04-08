import { generateOTP } from "../utils/otp.js";
import { saveOTP } from "../middleware/mfa.middleware.js";

export const sendOTP = (req, res) => {
    const userId = req.user.id;

    const otp = generateOTP();
    saveOTP(userId, otp);

    console.log("OTP:", otp); // abhi console me show kar rahe (real me SMS/email)

    res.json({ message: "OTP sent" });
};

export const sensitiveAction = (req, res) => {
    res.json({ message: "Sensitive action performed ✅" });
};