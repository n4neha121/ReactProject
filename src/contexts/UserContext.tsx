// src/contexts/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface IUserData {
    _id: string;
    username: string;
    email: string;
    password: string;
    profileData: Record<string, unknown>;
    __v: number;
}

interface UserContextType {
    user: IUserData | null;
    setUser: (user: IUserData | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUserData | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("userrr..");
    }
    return context;
};
