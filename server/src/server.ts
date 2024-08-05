import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRouter } from '../src/user/userRouter';
import { messageRouter } from '../src/message/messageRouter';
import { chatRouter } from '../src/chat/chatRouter';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (res: Response) => {
    res.send("API is running");
});

app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);
app.use("/api/chat", chatRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})