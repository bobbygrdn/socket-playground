import { Request } from 'express';
import { chatRepository } from './chatRepository';
import { ResponseStatus, ServiceResponse } from '../common/models/serviceResponse';
import { StatusCodes } from 'http-status-codes';
import { Chat } from './chatModel';

export const chatService = {
    accessChat: async (req: Request): Promise<ServiceResponse<Chat | null>> => {
        try {
            const chat = await chatRepository.accessChatAsync(req);

            if (!chat) {
                return new ServiceResponse(ResponseStatus.Failed, 'No chat accessed', null, StatusCodes.NOT_FOUND);
            }

            return new ServiceResponse<Chat>(ResponseStatus.Success, 'Chat accessed', chat, StatusCodes.OK);
        } catch (error) {

            const errorMessage = `Error accessing chat: $${(error as Error).message}`;

            console.error(error);

            return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },

    // Get all chats
    findAll: async (): Promise<ServiceResponse<Chat[] | null>> => {
        try {

            const chats = await chatRepository.findAllAsync();

            if (!chats) {
                return new ServiceResponse(ResponseStatus.Failed, 'No chats found', null, StatusCodes.NOT_FOUND);
            }

            return new ServiceResponse<Chat[]>(ResponseStatus.Success, 'Chat accessed', chats, StatusCodes.OK);
        } catch (error) {

            const errorMessage = `Error accessing chats: $${(error as Error).message}`;

            console.error(error);

            return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },

    // Create channel
    createChannel: async (req: Request): Promise<ServiceResponse<Chat | null>> => {
        try {

            const channel = await chatRepository.createChannelAsync(req);

            if (!channel) {
                return new ServiceResponse(ResponseStatus.Failed, 'Channel not created', null, StatusCodes.NOT_FOUND);
            }

            return new ServiceResponse<Chat>(ResponseStatus.Success, 'Channel created', channel, StatusCodes.OK);
        } catch (error) {

            const errorMessage = `Error creating channel: $${(error as Error).message}`;

            console.error(error);

            return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },

    // Rename channel
    renameChannel: async (req: Request): Promise<ServiceResponse<Chat | null>> => {
        try {

            const channel = await chatRepository.renameChannelAsync(req);

            if (!channel) {
                return new ServiceResponse(ResponseStatus.Failed, 'Channel not renamed', null, StatusCodes.NOT_FOUND);
            }

            return new ServiceResponse<Chat>(ResponseStatus.Success, 'Channel renamed successfully', channel, StatusCodes.OK);
        } catch (error) {

            const errorMessage = `Error renaming channel: $${(error as Error).message}`;

            console.error(error);

            return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },

    // Delete channel
    deleteChannel: async (req: Request): Promise<ServiceResponse<null>> => {
        try {

            const channel = await chatRepository.deleteChannelAsync(req);

            if (!channel) {
                return new ServiceResponse(ResponseStatus.Failed, 'Channel not deleted', null, StatusCodes.NOT_FOUND);
            }

            return new ServiceResponse<null>(ResponseStatus.Success, 'Channel deleted', null, StatusCodes.OK);
        } catch (error) {

            const errorMessage = `Error deleting channel: $${(error as Error).message}`;

            console.error(error);

            return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },

    // Add user to channel
    addUserToChannel: async (req: Request): Promise<ServiceResponse<Chat | null>> => {
        try {

            const channel = await chatRepository.addUserToChannelAsync(req);

            if (!channel) {
                return new ServiceResponse(ResponseStatus.Failed, 'User not added to channel', null, StatusCodes.NOT_FOUND);
            }

            return new ServiceResponse<Chat>(ResponseStatus.Success, 'User added to channel successfully', channel, StatusCodes.OK);
        } catch (error) {

            const errorMessage = `Error adding user to channel: $${(error as Error).message}`;

            console.error(error);

            return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },

    // Remove user from or leave channel
    removeUserFromChannel: async (req: Request): Promise<ServiceResponse<Chat | null>> => {
        try {

            const channel = await chatRepository.createChannelAsync(req);

            if (!channel) {
                return new ServiceResponse(ResponseStatus.Failed, 'User not removed from channel', null, StatusCodes.NOT_FOUND);
            }

            return new ServiceResponse<Chat>(ResponseStatus.Success, 'User removed from channel successfully', channel, StatusCodes.OK);
        } catch (error) {

            const errorMessage = `Error removing user from channel: $${(error as Error).message}`;

            console.error(error);

            return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
}