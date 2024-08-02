import mongoose, { Model, ObjectId, Schema } from 'mongoose';

type Chat = {
    chatName: string;
    isGroupChat: boolean;
    users: ObjectId[];
    groupAdmin: ObjectId[];
};

const mongooseChatSchema = new Schema<Chat>(
    {
        chatName: { type: String, trim: true, required: true },
        isGroupChat: { type: Boolean, default: false },
        users: {
            type: [{ type: Schema.Types.ObjectId, ref: "User" }],
            required: true
        },
        groupAdmin: {
            type: [{ type: Schema.Types.ObjectId, ref: "User" }],
            required: true
        },
    },
    { timestamps: true }
);

export const Chat: Model<Chat> = mongoose.model<Chat>("Chat", mongooseChatSchema);