import express from "express";
import { sendOTP, sensitiveAction } from "../controllers/secure.controller.js";
import { verifyMFA } from "../middleware/mfa.middleware.js";
import { verifyToken } from "../middleware/auth.middleware.js";  // 🔥 ye add kiya

const router = express.Router();

// 🔥 FIX yaha hai
router.get("/send-otp", verifyToken, sendOTP);

// MFA protected route
router.post("/secure-action", verifyMFA, sensitiveAction);

export default router;