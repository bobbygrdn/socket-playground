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
app.use("/api/chats", chatRouter);

app.use(errorHandler());

const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

// On connection, socket will join the user's id room
io.on("connection", (socket) => {
    console.log(`New client connected on socket: ${socket.id}`);

    // Handles setup event and joins user to users room
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    })

    // Handles joining room
    socket.on("join room", (room) => {
        socket.join(room);
        console.log(`User Joined Room: ${room}`)
    });

    // Handles typing event for frontend UI
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    // Handles sending messages
    socket.on("new message", (newMessage) => {
        const chat = newMessage.chat;
        if (!chat.users) return console.log("Chat.users not defined");

        chat.users.forEach((user: any) => {
            if (user._id === newMessage.sender._id) return;
            socket.in(user._id).emit("message received", newMessage);
        });
    });

    // Handles disconnection
    socket.off("setup", (userData) => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id)
    })
});

httpServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});