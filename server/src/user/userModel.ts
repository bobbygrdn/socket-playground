import mongoose, { Model, Schema, Document } from 'mongoose';

export interface User extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    profilePic: string;
    toExistingUser(): ExistingUser;
};

export interface ExistingUser {
    _id: string;
    name: string;
    email: string;
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

mongooseUserSchema.methods.toExistingUser = function (this: User): ExistingUser {
    return {
        _id: this._id,
        name: this.name,
        email: this.email,
        profilePic: this.profilePic
    };
};

export const User: Model<User> = mongoose.model<User>("User", mongooseUserSchema);