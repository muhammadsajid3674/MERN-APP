import loginActionTypes from "../Constants";

const INITIAL_VALUES = {
    loginLoading: false,
    loginData: "",
    loginError: ""
}

export const loginReducer = (state = INITIAL_VALUES, action) => {
    switch (action.type) {
        case loginActionTypes.USER_LOGIN_LOADING:
            return {
                ...state,
                loginLoading: true
            };
        case loginActionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                loginLoading: false,
                loginData: action.payload?.data
            };
        case loginActionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                loginLoading: false,
            };
        default:
            return state;
    }
}