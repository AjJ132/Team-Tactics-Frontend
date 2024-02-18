import {useQuery} from 'react-query';
import { User } from '../Interfaces/User';


//used to sign in the user. returns the user object if successful, else returns null.
export const UserSignin = async (email: string, password: string): Promise<User | null> => {
    const apiUrl = "http://localhost:7071";
    
    try {
        const response = await fetch(`${apiUrl}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({email, password}),
        });

        if (!response.ok) {
            // Throw an error with the status code for non-2xx responses
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data as User;
    } catch (error) {
        console.error("Error in UserSignin: ", (error as Error).message);
        return null; // Return null in case of error
    }
};


//used to verify if the user is signed in and cookie has not expired. returns true if user is signed in, false if not.
export const CheckAuthentication = async (): Promise<{isAuthenticated: boolean, user: User} | null> => {
    try {
        // const apiUrl = process.env.REACT_APP_BACKEND_API_URL;
        const apiUrl = "http://localhost:7071";
        const response = await fetch(`${apiUrl}/auth/check-authentication`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            return { isAuthenticated: true, user: data as User };
        } else {
            const data = { isAuthenticated: false, user: {} as User }; // Return an empty user object
            console.error("Error checking authentication", response);
            return data;
        }
    } catch (error) {
        console.error("Failed: Error checking authentication", error);
        return null;
    }
}