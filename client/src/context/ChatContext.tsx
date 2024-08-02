import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
    name: string;
    email: string;
}

interface Chat {
    _id: string;
    chatName: string;
    isGroupChat: boolean;
    users: User[];
}

interface ChatContextType {
    chats: Chat[];
    setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
    groupChats: Chat[];
    setGroupChats: React.Dispatch<React.SetStateAction<Chat[]>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [groupChats, setGroupChats] = useState<Chat[]>([]);
    const [chats, setChats] = useState<Chat[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/chats')
            .then(res => res.json())
            .then(data => {
                const groupChats = data.filter((chat: Chat) => chat.isGroupChat);
                const individualChats = data.filter((chat: Chat) => !chat.isGroupChat);
                setGroupChats(groupChats);
                setChats(individualChats);
            });
    }, []);

    return (
        <ChatContext.Provider value={{ chats, setChats, groupChats, setGroupChats }}>
            {children}
        </ChatContext.Provider>
    );
};

export { ChatContext, ChatProvider };