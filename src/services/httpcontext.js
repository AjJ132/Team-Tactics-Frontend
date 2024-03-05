export const http_context = async (url, options) => {
    try {
        const response = await fetch(url, options);

        //Might use this later to redirect to login page if token is expired -AJ
        // if(response.status === 401){
            
        //     window.location.href = '/signin';
        //     console.log('401');
        // }

        return response;
    } catch (error) {
        console.log('Server Offline');
        console.error('HTTP Context Error Thrown: ', error);
        throw error;
    }
};