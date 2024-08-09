import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { UserContext } from './UserContext';
import { fetchChats } from '../service/chatService';

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

interface ChatContextType {
    chats: Chat[];
    setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
    channels: Chat[];
    setChannels: React.Dispatch<React.SetStateAction<Chat[]>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [channels, setChannels] = useState<Chat[]>([]);
    const [chats, setChats] = useState<Chat[]>([]);

    const userContext = useContext(UserContext);

    useEffect(() => {

        if (!userContext?.user?._id) {
            setChats([]);
            setChannels([]);
        } else {
            const data = fetchChats(
                userContext?.user?._id
            ).then((data) => {
                setChats(data?.responseObject?.filter((channel: Chat) => channel.isChannel === false));
                setChannels(data?.responseObject?.filter((channel: Chat) => channel.isChannel === true));
            });
        }
    }, [userContext]);

    return (
        <ChatContext.Provider value={{ chats, setChats, channels, setChannels }}>
            {children}
        </ChatContext.Provider>
    );
};

export { ChatContext, ChatProvider };