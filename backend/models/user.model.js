
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: "String",
        required: true,
    },
    email: {
        type: "string",
        required: true,
        // unique: true,
    },
    password: {
        type: "String",
        required: true,
    },
}, { timestamps: true }); // creates createdAt & updatedAt fields

const User = mongoose.model("User", userSchema);
export default User;