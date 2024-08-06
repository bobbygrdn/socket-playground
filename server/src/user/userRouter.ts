import express, { Request, Response, Router } from "express";
import { userService } from "./userService";
import { handleServiceResponse } from "../common/utils/httpHandlers";

export const userRouter: Router = (() => {
    const router = express.Router();

    // Get all users
    router.get('/', async (req: Request, res: Response) => {
        const serviceResponse = await userService.findAll();
        handleServiceResponse(serviceResponse, res);
    });

    //  Get user by id
    router.get('/:id', async (req: Request, res: Response) => {
        const serviceResponse = await userService.findById(req.params.id);
        handleServiceResponse(serviceResponse, res);
    });


    // Create user
    router.post('/register', async (req: Request, res: Response) => {
        const serviceResponse = await userService.create(req);
        handleServiceResponse(serviceResponse, res);
    });

    // Login user
    router.post('/login', async (req: Request, res: Response) => {
        const serviceResponse = await userService.validate(req);
        handleServiceResponse(serviceResponse, res);
    });

    // Update user
    router.put('/:id', async (req: Request, res: Response) => {
        const serviceResponse = await userService.update(req.params.id, req.body);
        handleServiceResponse(serviceResponse, res);
    });

    return router;
})();