import {useQuery} from 'react-query';
import { User } from '../Interfaces/User';

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

//used to sign in the user. returns the user object if successful, else returns null.
const signin = async (): Promise<User> => {
    const response = await fetch(`${apiUrl}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            }, 
        });

    const data = await response.json();
    return data as User;
};

//used to verify if the user is signed in and cookie has not expired. returns true if user is signed in, false if not.
const checkAuthentication = async (): Promise<Boolean> => {
    const response = await fetch(`${apiUrl}/checkAuthentication`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    //if response is 200, return true, else return false
    return response.status === 200;
}