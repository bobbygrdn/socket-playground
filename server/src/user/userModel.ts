import mongoose, { Model, ObjectId, Schema } from 'mongoose';

type User = {
    name: string;
    email: string;
    password: string;
    profilePic: string;
};

const mongooseUserSchema = new Schema<User>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        profilePic: { type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" },
    },
    { timestamps: true }
);

export const User: Model<User> = mongoose.model<User>("User", mongooseUserSchema);