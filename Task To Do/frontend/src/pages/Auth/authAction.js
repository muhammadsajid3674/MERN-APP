import { asyncResActionTypes } from "../../config/common/AsyncResponse/asyncConstant";
import Strings from "../../config/common/constants/Strings";
import { UserApi } from "../../config/common/utils/api";
import authActionTypes from "./authConstant";

const userApi = new UserApi()
export const loginAction = ({ emailAddress, password }, toast, navigate) => {
    return async (dispatch) => {
        try {
            dispatch({ type: asyncResActionTypes.ASYNC_ACTION_START });
            const objToSend = {
                email: emailAddress,
                password
            }
            // const response = await postMethodCustomHeader('api/user/login', obToSend)
            await userApi.getUserAuth(objToSend)
                .then(response => {
                    const access_token = response.data.token;
                    localStorage.setItem("token", access_token)
                    dispatch({
                        type: authActionTypes.USER_LOGIN,
                        payload: response
                    })
                    toast.success(Strings.userLogin);
                    dispatch({ type: asyncResActionTypes.ASYNC_ACTION_FINISH, payload: authActionTypes.USER_LOGIN });
                    navigate("/dashboard");
                })
                .catch(err => console.log(err));
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
            const objToSend = {
                name: username,
                email: emailAddress,
                password
            };
            // const response = await postMethodCustomHeader('api/user/', obToSend);
            await userApi.addNewUser(objToSend)
                .then(response => {
                    const access_token = response.data.token;
                    localStorage.setItem("token", access_token)
                    dispatch({
                        type: authActionTypes.USER_SIGNUP,
                        payload: response
                    });
                    dispatch({ type: asyncResActionTypes.ASYNC_ACTION_FINISH, payload: authActionTypes.USER_SIGNUP });
                    navigate("/dashboard");
                })
                .catch(err => console.log(err))

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
