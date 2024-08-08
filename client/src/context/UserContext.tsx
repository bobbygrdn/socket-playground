import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
    _id: string | null;
    name: string;
    email: string;
    profilePic: string;
}

interface UserContextType {
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | undefined>(undefined);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };