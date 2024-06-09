import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        permissions: {
            type: [String],
            default: [],
        },
    },
    {
        timestamp: true
    });

const modelUser = mongoose.models.User || mongoose.model("User", userSchema);

export default modelUser;
