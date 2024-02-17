import { createContext, PropsWithChildren, useContext, useState } from "react";

import { User } from "../Interfaces/User";

const AuthContext = createContext<User | null>(null);

type AuthProviderProps = PropsWithChildren & {
    isSignedIn?: boolean;
};

export default function AuthProvider({
    children,
    isSignedIn = false,
} : AuthProviderProps){
    const [user] = useState<User | null>(isSignedIn ? { firstName: 'john', lastName: 'doe', email: 'idek', userId: "1234" } : null);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext);
   
    if(context === undefined){
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}