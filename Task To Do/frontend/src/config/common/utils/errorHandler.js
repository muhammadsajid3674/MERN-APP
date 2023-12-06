
import codeMessage from './codeMessage';
import { toast } from 'react-toastify';

const errorHandler = (error) => {
    const { response } = error;

    if (response && response.status) {
        const message = response.data && response.data.message;

        const errorText = message || codeMessage[response.status];
        const { status } = response;

        toast.success(`Request error ${status}`)
        // notification.config({
        //   duration: 10,
        // });
        // notification.error({
        //   message: `Request error ${status}`,
        //   description: errorText,
        // });
        // if (response.data && response.data.jwtExpired) {
        //   navigate('/logout');
        // }
        return response.data;
    } else {

        toast.success("No internet connection")
        // notification.config({
        //     duration: 5,
        // });
        // notification.error({
        //     message: 'No internet connection',
        //     description: 'Cannot connect to the server, Check your internet network',
        // });
        return {
            success: false,
            result: null,
            message: 'Cannot connect to the server, Check your internet network',
        };
    }
};

export default errorHandler;
