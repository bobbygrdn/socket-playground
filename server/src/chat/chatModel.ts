import mongoose, { Model, ObjectId, Schema } from 'mongoose';

export type Chat = {
    chatName: string;
    isChannel: boolean;
    users: ObjectId[];
    chatAdmin: ObjectId[];
};

const mongooseChatSchema = new Schema<Chat>(
    {
        chatName: { type: String, trim: true, required: true },
        isChannel: { type: Boolean, default: false },
        users: {
            type: [{ type: Schema.Types.ObjectId, ref: "User" }],
            required: true
        },
        chatAdmin: {
            type: [{ type: Schema.Types.ObjectId, ref: "User" }],
            required: true
        },
    },
    { timestamps: true }
);

export const Chat: Model<Chat> = mongoose.model<Chat>("Chat", mongooseChatSchema);