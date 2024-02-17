import {useQuery} from 'react-query';
import { User } from '../Interfaces/User';

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

const fetchUser = async (): Promise<User> => {
    const response = await fetch(`${apiUrl}/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            }, 
        credentials: 'include'
        });

    const data = await response.json();
    return data as User;
};