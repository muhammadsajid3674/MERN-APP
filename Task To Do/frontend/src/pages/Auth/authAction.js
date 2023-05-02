import { asyncResActionTypes } from "../../config/common/AsyncResponse/asyncConstant";
import { postMethodCustomHeader } from "../../config/utils/apiResponse";
import Strings from "../../constants/Strings";
import authActionTypes from "./authConstant";


export const loginAction = ({ emailAddress, password }, toast, navigate) => {
    return async (dispatch) => {
        try {
            dispatch({ type: asyncResActionTypes.ASYNC_ACTION_START });
            const obToSend = {
                email: emailAddress,
                password
            }
            const response = await postMethodCustomHeader('api/user/login', obToSend)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("userData", JSON.stringify(response.data.data))
            dispatch({
                type: authActionTypes.USER_LOGIN,
                payload: response
            })
            toast.success(Strings.userLogin);
            dispatch({ type: asyncResActionTypes.ASYNC_ACTION_FINISH, payload: authActionTypes.USER_LOGIN });
            navigate("/dashboard");
        } catch (error) {
            console.log("error :: " + error);
            toast.error(Strings.errorMessage);
            dispatch({ type: asyncResActionTypes.ASYNC_ACTION_ERROR });
        }
    }
}

export const signupAction = ({ username, emailAddress, password }, toast, navigate) => {
    return async (dispatch) => {
        try {
            dispatch({ type: asyncResActionTypes.ASYNC_ACTION_START });
            const obToSend = {
                name: username,
                email: emailAddress,
                password
            };
            const response = await postMethodCustomHeader('api/user/', obToSend);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userData", JSON.stringify(response.data.data));
            dispatch({
                type: authActionTypes.USER_SIGNUP,
                payload: response
            });
            dispatch({ type: asyncResActionTypes.ASYNC_ACTION_FINISH, payload: authActionTypes.USER_SIGNUP });
            navigate("/dashboard");
        } catch (error) {
            console.log("error :: " + error);
            toast.error(Strings.errorMessage);
            dispatch({ type: asyncResActionTypes.ASYNC_ACTION_ERROR });
        }
    }
}

export const logoutAction = (toast, navigate) => {
    return async (dispatch) => {
        try {
            dispatch({ type: asyncResActionTypes.ASYNC_ACTION_START });
            localStorage.removeItem("userData");
            localStorage.removeItem("token");
            dispatch({ type: authActionTypes.USER_LOGOUT });
            dispatch({ type: asyncResActionTypes.ASYNC_ACTION_FINISH, payload: authActionTypes.USER_LOGOUT });
            navigate("/");
        } catch (error) {
            console.log("error :: " + error);
            toast.error(Strings.errorMessage);
            dispatch({ type: asyncResActionTypes.ASYNC_ACTION_ERROR });
        }
    }
}