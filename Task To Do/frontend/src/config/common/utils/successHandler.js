
import codeMessage from './codeMessage';
import { toast } from 'react-toastify';

const successHandler = (response, options = { notifyOnSuccess: false, notifyOnFailed: true }) => {
    const { data } = response;
    if (data && data.success === true) {
        const message = response.data && data.message;
        const successText = message || codeMessage[response.status];

        if (options.notifyOnSuccess) {
            toast.success('Request success')
        }
    } else {
        const message = response.data && data.message;
        const errorText = message || codeMessage[response.status];
        const { status } = response;
        if (options.notifyOnFailed) {

            toast.error(`Request error ${status}`)
        }
    }
};

export default successHandler;
