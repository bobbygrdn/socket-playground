import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io';
import { userRouter } from '../src/user/userRouter';
import { messageRouter } from '../src/message/messageRouter';
import { chatRouter } from '../src/chat/chatRouter';
import { healthCheckRouter } from '../src/healthCheck/healthCheckRouter';
import errorHandler from '../src/common/middleware/errorHandler';
import { createServer } from 'http';

const app = express();
dotenv.config();

app.use(cors({ origin: "http://localhost:8080" }));
app.use(express.json());

app.use("/", healthCheckRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);
app.use("/api/chat", chatRouter);

app.use(errorHandler());

const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);


const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`New client connected on socket: ${socket.id}`);
    socket.emit("connected");
});

httpServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});