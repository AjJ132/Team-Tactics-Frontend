import { createContext, PropsWithChildren, useContext, useState, useEffect } from "react";
import { CheckAuthentication } from '../api/AuthAPIFunctions';
import { User } from "../Interfaces/User";

// Update your context type to include user and isAuthenticated
// Provide an initial context value that matches the AuthContextType
type CalendarProviderProps = PropsWithChildren & {
    isLoading?: boolean;
};

const CalendarContext = createContext<CalendarProviderProps>({
    isLoading: true,
});

export default function CalendarProvider({ children }: PropsWithChildren<{}>) {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // Fetch data from the API
        // Set the loading state to false when the data is fetched
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <div>Loading Calendar Provider...</div>; // Consider typing this as ReactNode for flexibility
    }

    return (
        <CalendarContext.Provider value={{ isLoading: isLoading }}>
            {children}
        </CalendarContext.Provider>
    );
}

        export const useCalendar = () => {
            const context = useContext(CalendarContext);
           
            if (context === undefined){
                throw new Error('useCalendar must be used within an CalendarProvider');
            }

            return context;
        }
