const API_URL = import.meta.env.VITE_ClubCore_Server_API; //Url is stored in .env file -AJ
import { http_context } from './http-context.js'; //Importing custom http_context function -AJ

export const signin_service = async (email, password) => {
    try {
        const response = await http_context(`${API_URL}/login?useCookies=true`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            return false;
        }
        return true;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

export const signup_service = async (email, password, firstname, lastname) => {
    try {

        const response = await http_context(`${API_URL}/register`, {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify({ email, password, firstname, lastname})
        });

        if (response.status === 409) {
            console.log('Username already exists');
            return 409;
        }

        if (!response.ok) {
            console.log('Network response was not ok');
            throw new Error('Network response was not ok');
        }

        return true;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};
