import { createContext, useContext } from "react";
import { User } from "../interfaces/User";


export const UserContext = createContext<User | undefined>(undefined);

export function useUserContext() {
    const user = useContext(UserContext);

    if (user === undefined){
        throw new Error('useUserContext must be used within a UserContext.Provider');
    }

    return user;
}