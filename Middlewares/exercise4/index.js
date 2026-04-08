import mongoose from "mongoose";
import User from "./models/user.model.js";

await mongoose.connect("mongodb://localhost:27017/test-db");
console.log("MongoDB connected");

// 🔹 Create user
const user = await User.create({
    email: "test@gmail.com",
    password: "1234"
});

console.log("User created:", user);

// 🔹 Soft delete test
await User.findByIdAndDelete(user._id);

console.log("User soft deleted");

// 🔹 Fetch users
const users = await User.find();
console.log("Users after delete:", users);