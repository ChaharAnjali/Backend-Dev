import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    password: String,

    loginTime: Date,
    logoutTime: Date,
    lastActive: Date
});

// 🔥 LOGIN TIME + LAST ACTIVE (on save)
userSchema.pre("save", function (next) {
    if (this.isNew) {
        this.loginTime = new Date();
    }
    this.lastActive = new Date();  // always update
    next();
});

// 🔥 LAST ACTIVE (on update)
userSchema.pre("findOneAndUpdate", function (next) {
    this.set({ lastActive: new Date() });
    next();
});

// ✅ export default (important)
export default mongoose.model("User", userSchema);