// import { notification } from 'antd';
import { toast } from 'react-hot-toast';

import codeMessage from './codeMessage';

const successHandler = (response, options = { notifyOnSuccess: false, notifyOnFailed: true }) => {
    const { data } = response;
    if (data && data.success === true) {
        const message = response.data && data.message;
        const successText = message || codeMessage[response.status];

        if (options.notifyOnSuccess) {
            console.log('success :>> ', successText);
            toast.success(successText)
            //   notification.config({
            //     duration: 5,
            //   });
            //   notification.success({
            //     message: `Request success`,
            //     description: successText,
            //   });
        }
    } else {
        const message = response.data && data.message;
        const errorText = message || codeMessage[response.status];
        const { status } = response;
        if (options.notifyOnFailed) {
            console.log('Failed :>> ', { errorText, status });
            toast.error(errorText)
            //   notification.config({
            //     duration: 5,
            //   });
            //   notification.error({
            //     message: `Request error ${status}`,
            //     description: errorText,
            //   });
        }
    }
};

export default successHandler;
