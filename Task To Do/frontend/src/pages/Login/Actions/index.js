import loginActionTypes from "../Constants"
import Strings from '../../../constants/Strings'
import { postMethodCustomHeader } from "../../../config/utils/apiResponse";

const loginAction = ({ emailAddress, password }, toast, navigate) => {
    return async (dispatch) => {
        try {
            dispatch({ type: loginActionTypes.USER_LOGIN_LOADING });
            const obToSend = {
                email: emailAddress,
                password
            }
            const response = await postMethodCustomHeader('api/user/login', obToSend)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("userDate", JSON.stringify(response.data.data))
            dispatch({
                type: loginActionTypes.USER_LOGIN_SUCCESS,
                payload: response.data
            })
            navigate("/dashboard");
        } catch (error) {
            console.log("error :: " + error);
            dispatch({ type: loginActionTypes.USER_LOGIN_FAIL });
            toast.error(Strings.errorMessage);
        }
    }
}

export default loginAction;