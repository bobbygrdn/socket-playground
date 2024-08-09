import React, { createContext, useState, useEffect, ReactNode, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    _id: string | null;
    name: string;
    email: string;
    profilePic: string;
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const isInitialRender = useRef(true);

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        setUser(userInfo ? JSON.parse(userInfo) : null);
    }, [])


    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        if (!user) {
            navigate('/');
        } else {
            navigate('/home');
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };