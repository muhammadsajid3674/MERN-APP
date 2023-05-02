import { createReducer } from "../../config/common/utils/createReducer";
import authActionTypes from "./authConstant";


const INITIAL_VALUES = {
    user: null,
    error: ""
}

const userLogin = (state, payload) => {
    return {
        user: payload?.data
    };
}

const userSignup = (state, payload) => {
    return {
        user: payload?.data
    };
}

const userLogout = () => {
    return {
        user: {}
    };
}

export default createReducer(INITIAL_VALUES, {
    [authActionTypes.USER_LOGIN]: userLogin,
    [authActionTypes.USER_SIGNUP]: userSignup,
    [authActionTypes.USER_LOGOUT]: userLogout,
})