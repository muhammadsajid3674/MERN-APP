import codeMessage from "./codeMessage";

const errorHandler = (error) => {
    const { response } = error
    if (response && response.status) {
        const message = response.data && response.data.message;
        const errorText = message || codeMessage[response.status];
        const { status } = response;
        console.log('Request error :>> ', status, errorText);
        return response.data;
    } else {
        console.log('No internet connection :>> ');
        return {
            success: false,
            result: null,
            message: 'Cannot connect to the server, Check your internet network',
        };
    }
}

export default errorHandler