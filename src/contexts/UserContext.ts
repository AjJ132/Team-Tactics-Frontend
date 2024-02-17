import { createContext, useContext } from "react";
import { User } from '../Interfaces/User';

  export const UserContext = createContext<User | undefined>(undefined);

  export function useUserContext() {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserContext.Provider');
    }

    return context; // This now includes both user and isAuthenticated
}
