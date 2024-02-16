//const API_URL = import.meta.env.VITE_ClubCore_Server_API; // Altered to work with typescript
const API_URL = 'http://localhost:7071'; // Altered to work with typescript


export const check_online_status = async () => {
    try {
        const response = await fetch(`${API_URL}/auth/online-status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (!response.ok) {
            return false;
        }
        return true;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}