export const http_context = async (url, options) => {
    try {
        const response = await fetch(url, options);

        if(response.status === 401 ) {
            console.log('401');
        }

        return response;
    } catch (error) {
        console.log('Server Offline');
        console.error('HTTP Context Error Thrown: ', error);
        
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
        // Redirect to a different page when the server is offline
        // if (window.location.pathname !== '/server-offline' && window.location.pathname !== '/user-signin' && window.location.pathname !== '/admin-signin' && window.location.pathname !== '/user-registration' && window.location.pathname !== '/admin-signup') {
        //     window.location.href = '/server-offline';
        // }
}

        throw error;
    }
};