import { mongoDatabase } from "../mongoDatabase";
import { Chat } from "./chatModel";
import { Request } from "express";

export const chatRepository = {
    // Start MongoDB connection
    startConnection: async () => {
        return await mongoDatabase.initConnection();
    },

    // Get all chats
    findAllAsync: async (): Promise<Chat[] | null> => {
        try {
            await chatRepository.startConnection();
            return await Chat.find();
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    // Access or Create chat
    accessChatAsync: async (req: Request): Promise<Chat | null> => {
        try {
            await chatRepository.startConnection();

            const { userId, id } = req.params;

            let isChat = await Chat.find({
                $and: [
                    { users: { $elemMatch: { $eq: id } } },
                    { users: { $elemMatch: { $eq: userId } } },
                ],
            })
                .populate("users", "-password");
            if (isChat.length > 0) {
                return isChat[0];
            } else {
                let chatData = {
                    chatName: "sender",
                    isChannel: false,
                    users: [userId, id],
                }
                try {
                    const createChat = new Chat(chatData);
                    const fullChat = await Chat.findOne({ _id: createChat._id }).populate(
                        "users",
                        "-password"
                    );
                    return fullChat;
                } catch (error) {
                    console.error(error);
                    return null;
                }
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    // Create channel
    createChannelAsync: async (req: Request): Promise<Chat | null> => {
        try {
            await chatRepository.startConnection();
            const createdChat = await Chat.create(req.body);
            const newCreatedChat = await Chat.findOne({ _id: createdChat._id });
            return newCreatedChat;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    // Rename channel
    renameChannelAsync: async (req: Request): Promise<Chat | null> => {
        try {
            await chatRepository.startConnection();
            const { id } = req.params;
            const { name } = req.body;
            const updatedChat = await Chat.findByIdAndUpdate(id, { name: name }, { new: true });
            return updatedChat;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    // Delete channel
    deleteChannelAsync: async (req: Request): Promise<Chat | null> => {
        try {
            await chatRepository.startConnection();
            const { id } = req.params;
            return await Chat.findByIdAndDelete(id);
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    // Add user to channel
    addUserToChannelAsync: async (req: Request): Promise<Chat | null> => {
        try {
            await chatRepository.startConnection();
            const { id } = req.params;
            const { userId } = req.body;
            const updatedChat = await Chat.findByIdAndUpdate(id, { $push: { users: userId } }, { new: true });
            return updatedChat;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    // Remove user from channel
    removeUserFromChannelAsync: async (req: Request): Promise<Chat | null> => {
        try {
            await chatRepository.startConnection();
            const { id } = req.params;
            const { userId } = req.body;
            const updatedChat = await Chat.findByIdAndUpdate(id, { $pull: { users: userId } }, { new: true });
            return updatedChat;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}