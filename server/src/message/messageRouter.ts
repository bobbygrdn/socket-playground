import express, { Request, Response, Router } from "express";
import { messageService } from './messageService';
import { handleServiceResponse } from "../common/utils/httpHandlers";

export const messageRouter: Router = (() => {
    const router = express.Router();

    // Get Message by id
    router.get('/:id', async (req: Request, res: Response) => {
        const serviceResponse = await messageService.findById(req.params.id);
        handleServiceResponse(serviceResponse, res);
    });

    // Create Message
    router.post('/', async (req: Request, res: Response) => {
        const serviceResponse = await messageService.create(req);
        handleServiceResponse(serviceResponse, res);
    });

    return router;
})();