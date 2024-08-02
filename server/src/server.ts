import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { chats } from '../data/data';

const app = express();
dotenv.config();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("API is running");
});

app.get("/api/chats", (req: Request, res: Response) => {
    res.send(chats);
});

app.get("/api/chat/:id", (req: Request, res: Response) => {
    const chat = chats.find((c) => c._id === req.params.id);
    res.send(chat);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})