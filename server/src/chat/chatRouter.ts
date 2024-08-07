import express, { Request, Response, Router } from "express";
import { handleServiceResponse } from '../common/utils/httpHandlers';
import { chatService } from './chatService';

export const chatRouter: Router = (() => {
    const router = express.Router();

    // Access or create chat
    router.post('/', async (req: Request, res: Response) => {
        const serviceResponse = await chatService.accessChat(req);
        handleServiceResponse(serviceResponse, res);
    });

    // Get all chats for user
    router.get('/:id', async (req: Request, res: Response) => {
        const serviceResponse = await chatService.findAll(req);
        handleServiceResponse(serviceResponse, res);
    });

    // Create channel
    router.post('/channel', async (req: Request, res: Response) => {
        const serviceResponse = await chatService.createChannel(req);
        handleServiceResponse(serviceResponse, res);
    });

    // Rename channel
    router.put('/channel/:id', async (req: Request, res: Response) => {
        const serviceResponse = await chatService.renameChannel(req);
        handleServiceResponse(serviceResponse, res);
    });

    // Delete channel
    router.delete('/channel/:id', async (req: Request, res: Response) => {
        const serviceResponse = await chatService.deleteChannel(req);
        handleServiceResponse(serviceResponse, res);
    });

    // Add user to channel
    router.put('/channel/:id/add', async (req: Request, res: Response) => {
        const serviceResponse = await chatService.addUserToChannel(req);
        handleServiceResponse(serviceResponse, res);
    });

    // Remove user from or leave channel
    router.put('/channel/:id/remove', async (req: Request, res: Response) => {
        const serviceResponse = await chatService.removeUserFromChannel(req);
        handleServiceResponse(serviceResponse, res);
    });

    return router;
})();