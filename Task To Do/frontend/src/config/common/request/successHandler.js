import codeMessage from "./codeMessage";

const successHandler = (response, options = { notifyOnSuccess: false, notifyOnFailed: true }) => {
    const { data } = response;
    if (data && data.success === true) {
        const message = response.data && data.message;
        const successText = message || codeMessage[response.status];

        if (options.notifyOnFailed) {
            return console.log('Request success :>> ', successText);
        }
    } else {
        const message = response.data && data.message;
        const errorText = message || codeMessage[response.status]
        const { status } = response
        if (options.notifyOnFailed) {
            return console.log('Request error :>> ', errorText);
        }
    }
}

export default successHandler