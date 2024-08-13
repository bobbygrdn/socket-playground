import { mongoDatabase } from "../mongoDatabase";
import { Chat } from "./chatModel";
import { User } from "../user/userModel";
import { Request } from "express";

export const chatRepository = {
    // Start MongoDB connection
    startConnection: async () => {
        return await mongoDatabase.initConnection();
    },

    // Get all chats
    findAllAsync: async (req: Request): Promise<Chat[] | null> => {
        try {
            await chatRepository.startConnection();
            let chats = await Chat.find({ users: { $elemMatch: { $eq: req.params.id } } })
                .populate("users", "-password")
                .populate("chatAdmin", "-password")
                .sort({ updatedAt: -1 });

            chats = await User.populate(chats, {
                path: "users",
                select: "name profilePic email"
            }) as any;

            return chats;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    // Access or Create chat
    accessChatAsync: async (req: Request): Promise<Chat | null> => {
        try {
            await chatRepository.startConnection();

            const { recipientId, creatorId } = req.body;

            let isChat = await Chat.find({
                isChannel: false,
                $and: [
                    { users: { $elemMatch: { $eq: recipientId } } },
                    { users: { $elemMatch: { $eq: creatorId } } },
                ],
            })
                .populate("users", "-password");

            isChat = await User.populate(isChat, {
                path: "users",
                select: "name profilePic email"
            }) as any;

            if (isChat.length > 0) {
                return isChat[0];
            } else {
                const personToChatWith = await User.findOne({ _id: recipientId });

                let chatData = {
                    chatName: personToChatWith?.name,
                    isChannel: false,
                    users: [creatorId, recipientId],
                }

                try {
                    const createChat = new Chat(chatData);
                    await createChat.save();

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
            const existingChat = await Chat.findOne({ chatName: req.body.chatName });

            if (existingChat) {
                return null
            } else {
                const createdChat = new Chat(req.body);
                await createdChat.save();
                const newCreatedChat = await Chat.findOne({ _id: createdChat._id })
                    .populate("users", "-password")
                    .populate("chatAdmin", "-password");

                return newCreatedChat;
            }

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

            const updatedChat = await Chat.findByIdAndUpdate(id, { chatName: name }, { new: true })
                .populate("users", "-password")
                .populate("chatAdmin", "-password");

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

            const channelUser = await Chat.findOne({ _id: id, users: userId });

            if (!channelUser) {
                const updatedChat = await Chat.findByIdAndUpdate(id, { $push: { users: userId } }, { new: true })
                    .populate("users", "-password")
                    .populate("chatAdmin", "-password");

                return updatedChat;
            }

            return null

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

            const updatedChat = await Chat.findByIdAndUpdate(id, { $pull: { users: userId } }, { new: true })
                .populate("users", "-password")
                .populate("chatAdmin", "-password");

            return updatedChat;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}