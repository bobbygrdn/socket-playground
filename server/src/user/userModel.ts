import mongoose, { Model, Schema } from 'mongoose';

export type User = {
    name: string;
    email: string;
    password: string;
    profilePic: string;
};

const mongooseUserSchema = new Schema<User>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profilePic: { type: String, required: false, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" },
    },
    { timestamps: true }
);

export const User: Model<User> = mongoose.model<User>("User", mongooseUserSchema);