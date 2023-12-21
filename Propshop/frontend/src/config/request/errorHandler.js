import toast from 'react-hot-toast';
import codeMessage from './codeMessage';

const errorHandler = (error) => {
    const { response } = error;
    console.log('response :>> ', response);
    if (response && response.status) {
        const message = response.data && response.data.message;
        const errorText = message || codeMessage[response.status];
        const { status } = response;
        console.log('Failed :>> ', {
            message: `Request error ${status}`,
            description: errorText,
        });
        toast.error(message)
        // if (response.data && response.data.jwtExpired) {
        //   navigate('/logout');
        // }
        return response.data;
    } else {

        console.log('No internet connection');
        toast.error("No internet connection")
        return {
            success: false,
            result: null,
            message: 'Cannot connect to the server, Check your internet network',
        };
    }
};

export default errorHandler;
