import { Message } from './messageModel';
import { mongoDatabase } from '../mongoDatabase';
import { Request } from 'express';

// TODO: Update according to messageController.js
export const messageRepository = {

    // Start MongoDB connection
    startConnection: async () => {
        return await mongoDatabase.initConnection();
    },

    // Get Message by id
    findByIdAsync: async (id: string) => {
        try {
            await messageRepository.startConnection();
            return await Message.findById(id);
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
            await newMessage.save();

            const findNewMessage = messageRepository.findByIdAsync(newMessage._id.toString());
            return findNewMessage;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
}