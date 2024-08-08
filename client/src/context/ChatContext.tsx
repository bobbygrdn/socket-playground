import React, { createContext, useState, ReactNode } from 'react';

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

    return (
        <ChatContext.Provider value={{ chats, setChats, channels, setChannels }}>
            {children}
        </ChatContext.Provider>
    );
};

export { ChatContext, ChatProvider };