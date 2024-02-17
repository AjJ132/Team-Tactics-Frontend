import { createContext, PropsWithChildren, useContext, useState, useEffect } from "react";
import { CheckAuthentication } from '../api/AuthAPIFunctions';
import { User } from "../Interfaces/User";

// Update your context type to include user and isAuthenticated
// Provide an initial context value that matches the AuthContextType
type AuthProviderProps = PropsWithChildren & {
    isAuthenticated?: boolean;
    user: User | null;
    isLoading?: boolean;
    loginSuccess: (loggedInUser: User) => void;
  };
  


const AuthContext = createContext<AuthProviderProps>({ user: null, isAuthenticated: false, isLoading: true, loginSuccess: () => {} });

export default function AuthProvider({ children }: PropsWithChildren<{}>) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const loginSuccess = (loggedInUser: User) => {
        setUser(loggedInUser);
        setIsAuthenticated(true);
      };
      

    useEffect(() => {
        const authenticateUser = async () => {
            //if at signin page, do not check for authentication
            if(window.location.pathname === '/signin'){
                setIsLoading(false);
                return;
            }
            //if at signup page, do not check for authentication
            if(window.location.pathname === '/signup'){
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const result = await CheckAuthentication(); // Ensure this function is typed correctly
                if (result && result.isAuthenticated) {
                    const user: User = result.user; // Casting to User type
                    setUser(user);
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Authentication check failed", error);
                setUser(null);
                setIsAuthenticated(false);
            }
            setIsLoading(false);
        };

        authenticateUser();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Consider typing this as ReactNode for flexibility
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, loginSuccess }}>
            {children}
        </AuthContext.Provider>

    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
   
    if (context === undefined){
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}