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
        const fetchChats = async () => {
            try {
                const response = await fetch(`${ENDPOINT}/api/chats/${userContext?.user?._id}`);
                const data = await response.json();

                if (!data) return;

                chatContext?.setChats(data?.responseObject?.filter((channel: Chat) => channel.isChannel === false));
                chatContext?.setChannels(data?.responseObject?.filter((channel: Chat) => channel.isChannel === true));
            } catch (error) {
                console.error('Error fetching chats: ', error);
            }
        };

        fetchChats();
    }, [])

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
