import { Outlet } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { ChatContext } from '../../context/ChatContext';
import './ContextWindow.css';

let socket: Socket;
const ENDPOINT = 'http://localhost:5000';

interface User {
    name: string;
    email: string;
}

interface Chat {
    _id: string;
    chatName: string;
    isChannel: boolean;
    users: User[];
}

export const ContextWindow: React.FC = (): JSX.Element => {

    const userContext = useContext(UserContext);
    const chatContext = useContext(ChatContext);

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.on("connected", () => console.log("Server Connected"))
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <article id="contextWindow">
            <Outlet />
        </article>
    );
}
