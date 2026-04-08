import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    password: String,

    isDeleted: {
        type: Boolean,
        default: false
    }
});

// 🔥 Soft delete
userSchema.pre("findOneAndDelete", async function (next) {
    const doc = await this.model.findOne(this.getQuery());

    if (doc) {
        doc.isDeleted = true;
        await doc.save();
    }

    next();
});

// 🔥 Hide deleted data
userSchema.pre(/^find/, function (next) {
    this.where({ isDeleted: false });
    next();
});

export default mongoose.model("User", userSchema);