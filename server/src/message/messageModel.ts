import mongoose, { Model, ObjectId, Schema } from 'mongoose';

type Message = {
    sender: ObjectId;
    content: string;
    chat: ObjectId;
};

const mongooseMessageSchema = new Schema<Message>(
    {
        sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, trim: true, required: true },
        chat: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
    },
    { timestamps: true }
);

export const Message: Model<Message> = mongoose.model<Message>("Message", mongooseMessageSchema);