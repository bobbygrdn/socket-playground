import express, { Router } from 'express';

export const healthCheckRouter: Router = (() => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.status(200).send('Server is up and running');
    });

    return router;
})();