import { Message } from './messageModel';
import { User } from '../user/userModel';
import { mongoDatabase } from '../mongoDatabase';
import { Request } from 'express';

export const messageRepository = {

    // Start MongoDB connection
    startConnection: async () => {
        return await mongoDatabase.initConnection();
    },

    // Get Message by id
    findByChatIdAsync: async (chatId: string) => {
        try {
            await messageRepository.startConnection();
            const messages = await Message.find({ chat: chatId })
                .populate("sender", "name profilePic email")
                .populate("chat");
            return messages;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    // Create Message
    createAsync: async (req: Request) => {
        try {
            await messageRepository.startConnection();
            const newMessage = new Message(req.body);

            if (!newMessage) return null;

            await newMessage.save();

            let findNewMessage = await Message.findOne({ _id: newMessage._id })
                .populate("sender", "name profilePic")
                .populate("chat");

            findNewMessage = await User.populate(findNewMessage, {
                path: "chat.users",
                select: "name profilePic email",
            }) as any;

            return findNewMessage;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
}