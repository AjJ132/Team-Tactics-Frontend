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
    toggleOfflineMode: (toggleOfflineMode: boolean) => void;
    logout: () => void;
    offlineMode?: boolean;
};

const AuthContext = createContext<AuthProviderProps>({ 
    user: null, 
    isAuthenticated: false, 
    isLoading: true, 
    loginSuccess: () => {},
    toggleOfflineMode: () => {},
    logout: () => {},
    offlineMode: false,
});

export default function AuthProvider({ children }: PropsWithChildren<{}>) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    //--------------------offline mode-------------------
    //use offline mode when not running the server.
    // as we update the data being used it might be useful to update this offline code with sample data to match. --AJ
    const [offlineMode, setOfflineMode] = useState<boolean>(false);
    const [offlineUser, setOfflineUser] = useState<User | null>({
        userId: "offlineUserId",
        firstName: "John",
        lastName: "Doe",
        email: "johdoe123@gmail.com",
        role: "Admin"
    });

    //on login success, set the user and isAuthenticated to true
    const loginSuccess = (loggedInUser: User) => {
        toggleOfflineMode(false);
        setUser(loggedInUser);
        setIsAuthenticated(true);
      };

      const logout = () => {
        setUser(null);
        setIsAuthenticated(false);

        //redirect to signin page
        window.location.href = '/signin';
      };

    //Method to swap in and out of offline mode
    const toggleOfflineMode = (value: boolean) => {
        console.log('offline mode', value);
        //grab current value
        const currentValue = offlineMode;
        
        setOfflineMode(value);
        
        //set the user to the offline user <-- John Doe
        setUser(value ? offlineUser : null);
        setIsAuthenticated(value);

        //set local storage, toggle local storage to help with maintaining offline mode when the page refreshes/reloads
        localStorage.setItem('offlineMode', value.toString());

        //if toggling from offline to online, redirect to signin
        if(currentValue && !value){
            window.location.href = '/signin';
        }
    };
      

    useEffect(() => {
        const authenticateUser = async () => {
            //check for offline mode, read local storage
            const offlineMode = localStorage.getItem('offlineMode');

            //if offline mode is true, set the user to the offline user. This is to help with maintaining offline mode when the page refreshes/reloads
            if(offlineMode === 'true'){
                console.log('offline mode')
                setOfflineMode(true);
                setUser(offlineUser);
                setIsAuthenticated(true);
                setIsLoading(false);
                return;
            } else //else update the state to false
            {
                setOfflineMode(false);
                console.log('online mode')

                //update the local storage
                localStorage.setItem('offlineMode', 'false');
            }

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
                console.log('checking authentication');
                const result = await CheckAuthentication(); // Ensure this function is typed correctly
                if (result && result.isAuthenticated) {
                    const user: User = result.user; // Casting to User type
                    setUser(user);
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);

                    //navgiate to signin
                    window.location.href = '/signin';
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
                <AuthContext.Provider value={{ user, isAuthenticated, isLoading, loginSuccess, toggleOfflineMode: toggleOfflineMode, logout, offlineMode }}>
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
