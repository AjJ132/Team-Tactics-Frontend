import { createContext, PropsWithChildren, useContext, useState, useEffect } from "react";
import { CheckAuthentication } from '../api/AuthAPIFunctions';
import { User } from "../Interfaces/User";
import { CalendarEvent, NewEvent } from "../Interfaces/Events";

// Update your context type to include user and isAuthenticated
// Provide an initial context value that matches the AuthContextType
type CalendarProviderProps = PropsWithChildren & {
    isLoading: boolean;
    myEvents: CalendarEvent[];
    createNewEvent: (newEvent: NewEvent) => void;
};

const CalendarContext = createContext<CalendarProviderProps>({
    isLoading: true,
    myEvents: [],
    createNewEvent: () => {},
});

export default function CalendarProvider({ children }: PropsWithChildren<{}>) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const apiUrl = "http://localhost:7071";

    const [myEvents, setMyEvents] = useState<CalendarEvent[]>([]);

    useEffect(() => {
        // Fetch data from the API
        // Set the loading state to false when the data is fetched
        setIsLoading(false);
    }, []);

    const createNewEvent = async (newEvent: NewEvent) => {
        // Create the new event
        const response = await fetch(`${apiUrl}/calendar/create-event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(newEvent),
        });

        if (!response.ok) {
            // Throw an error with the status code for non-2xx responses
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        

        //data is the new event. add it to the list of events
        addEvent(data);

        return;
    };

    const addEvent = (newEvent: CalendarEvent) => {
        setMyEvents([...myEvents, newEvent]);
    }

    if (isLoading) {
        return <div>Loading Calendar Provider...</div>; // Consider typing this as ReactNode for flexibility
    }

    return (
        <CalendarContext.Provider value={{ isLoading: isLoading, myEvents, createNewEvent }}>
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
