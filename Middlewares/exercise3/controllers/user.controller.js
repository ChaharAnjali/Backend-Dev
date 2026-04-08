import User from "../models/user.model.js";

// LOGIN
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
        user = new User({ email, password });
    }

    await user.save(); // 🔥 middleware trigger

    res.json({ message: "Login successful", user });
};

// LOGOUT
export const logoutUser = async (req, res) => {
    const { userId } = req.body;

    const user = await User.findByIdAndUpdate(
        userId,
        { logoutTime: new Date() },
        { new: true }
    );

    res.json({ message: "Logout successful", user });
};