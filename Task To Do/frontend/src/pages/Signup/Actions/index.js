import Strings from '../../../constants/Strings'
import { postMethodCustomHeader } from "../../../config/utils/apiResponse";
import signupActionTypes from '../Constant';

const signupAction = ({username, emailAddress, password }, toast, navigate) => {
    return async (dispatch) => {
        try {
            dispatch({ type: signupActionTypes.USER_SIGNUP_LOADING });
            const obToSend = {
                name: username,
                email: emailAddress,
                password
            }
            const response = await postMethodCustomHeader('api/user/', obToSend)
            console.log(response);
            dispatch({
                type: signupActionTypes.USER_SIGNUP_SUCCESS,
                payload: response.data
            })
            navigate("/");
        } catch (error) {
            console.log("error :: " + error);
            dispatch({ type: signupActionTypes.USER_SIGNUP_FAIL });
            toast.error(Strings.errorMessage);
        }
    }
}

export default signupAction;