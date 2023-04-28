import { postMethodCustomHeader } from "../../config/utils/apiResponse";
import Strings from "../../constants/Strings";
import authActionTypes from "./authConstant";


export const loginAction = ({ emailAddress, password }, toast, navigate) => {
    return async (dispatch) => {
        try {
            dispatch({ type: authActionTypes.USER_LOGIN_LOADING });
            const obToSend = {
                email: emailAddress,
                password
            }
            const response = await postMethodCustomHeader('api/user/login', obToSend)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("userDate", JSON.stringify(response.data.data))
            dispatch({
                type: authActionTypes.USER_LOGIN_SUCCESS,
                payload: response.data
            })
            navigate("/dashboard");
        } catch (error) {
            console.log("error :: " + error);
            dispatch({ type: authActionTypes.USER_LOGIN_FAIL });
            toast.error(Strings.errorMessage);
        }
    }
}

export const signupAction = ({ username, emailAddress, password }, toast, navigate) => {
    return async (dispatch) => {
        try {
            dispatch({ type: authActionTypes.USER_SIGNUP_LOADING });
            const obToSend = {
                name: username,
                email: emailAddress,
                password
            }
            const response = await postMethodCustomHeader('api/user/', obToSend)
            console.log(response);
            dispatch({
                type: authActionTypes.USER_SIGNUP_SUCCESS,
                payload: response.data
            })
            navigate("/");
        } catch (error) {
            console.log("error :: " + error);
            dispatch({ type: authActionTypes.USER_SIGNUP_FAIL });
            toast.error(Strings.errorMessage);
        }
    }
}
