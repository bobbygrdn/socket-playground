import { StatusCodes } from 'http-status-codes';
import { ResponseStatus, ServiceResponse } from '../common/models/serviceResponse';
import { Message } from './messageModel';
import { messageRepository } from './messageRepository';
import { Request } from 'express';

export const messageService = {

    // Get Message by id
    findById: async (id: string): Promise<ServiceResponse<Message | null>> => {
        try {
            const message = await messageRepository.findByIdAsync(id);
            if (!message) {
                return new ServiceResponse(ResponseStatus.Failed, 'No message found', null, StatusCodes.NOT_FOUND);
            }
            return new ServiceResponse<Message>(ResponseStatus.Success, 'Message found', message, StatusCodes.OK);
        } catch (error) {
            const errorMessage = `Error finding message: $${(error as Error).message}`;
            console.error(error);
            return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },

    // Create Message
    create: async (req: Request): Promise<ServiceResponse<Message | null>> => {
        try {
            const createdMessage = await messageRepository.createAsync(req);
            if (!createdMessage) {
                return new ServiceResponse(ResponseStatus.Failed, 'No Message created', null, StatusCodes.NOT_FOUND);
            }
            return new ServiceResponse<Message>(ResponseStatus.Success, 'Message created', createdMessage, StatusCodes.OK);
        } catch (error) {
            const errorMessage = `Error creating message: $${(error as Error).message}`;
            console.error(error);
            return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}
