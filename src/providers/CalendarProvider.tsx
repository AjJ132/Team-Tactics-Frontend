import { createContext, PropsWithChildren, useContext, useState, useEffect } from "react";
import { CheckAuthentication } from '../api/AuthAPIFunctions';
import { User, User_DTO } from "../Interfaces/User";
import { CalendarEvent, NewEvent } from "../Interfaces/Events";

// Update your context type to include user and isAuthenticated
// Provide an initial context value that matches the AuthContextType
type CalendarProviderProps = PropsWithChildren & {
    isLoading: boolean;
    myEvents: CalendarEvent[];
    createNewEvent: (newEvent: NewEvent) => void;
    getUsers: () => Promise<User_DTO[]>;
    getMyEvents: () => Promise<CalendarEvent[]>;
};

const CalendarContext = createContext<CalendarProviderProps>({
    isLoading: true,
    myEvents: [],
    createNewEvent: () => {},
    getUsers: async () => [],
    getMyEvents: async () => [],
});

export default function CalendarProvider({ children }: PropsWithChildren<{}>) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const apiUrl = "https://team-tactics-backend-linux.azurewebsites.net";
//const apiUrl = "http://localhost:7071"

    const [myEvents, setMyEvents] = useState<CalendarEvent[]>([]);

    // useEffect(() => {
    //     const fetchEvents = async () => {
    //         const events = await HandleGetMyEvents();
    //         setMyEvents(events);
    //         setIsLoading(false);
    //     };
    //     fetchEvents();
    // }, []);

    const HandleGetMyEvents =  async () : Promise<CalendarEvent[]> => {
        try {
            const response = await fetch(`${apiUrl}/calendar/myevents`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                // Throw an error with the status code for non-2xx responses
                return [];
            }

            let data = await response.json() as CalendarEvent[];

            data = data.map(event => ({
                ...event,
                startDate: new Date(event.startDate),
                endDate: new Date(event.endDate),
            }));

            return data;
        } catch (error) {
            console.error('Failed to fetch events:', error);
            return [];
        }
    }

    

    const createNewEvent = async (newEvent: NewEvent): Promise<boolean> => {
        // Create the new event
        const response = await fetch(`${apiUrl}/calendar/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(newEvent),
        });

        if (!response.ok) {
            // Throw an error with the status code for non-2xx responses
            return false;
        }

        const data = await response.json();
        
        //data is the new event. add it to the list of events
        addEvent(data);

        return true;
    };

    const HandleGetUsers = async (): Promise<User_DTO[]> => {
        try {
            const response = await fetch(`${apiUrl}/calendar/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                // Throw an error with the status code for non-2xx responses
                return [];
            }

            let data = await response.json() as User_DTO[];

            return data;
        } catch (error) {
            console.error('Failed to fetch users:', error);
            return [];
        }
    }

    const addEvent = (newEvent: CalendarEvent) => {
        setMyEvents([...myEvents, newEvent]);
    }

    return (
        <CalendarContext.Provider value={{ isLoading: isLoading, myEvents, createNewEvent, getUsers: HandleGetUsers, getMyEvents: HandleGetMyEvents }}>
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
