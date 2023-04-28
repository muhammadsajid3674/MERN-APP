import authActionTypes from "./authConstant";


const INITIAL_VALUES = {
    login: {
        loginLoading: false,
        loginData: "",
        loginError: ""
    },
    signin: {
        signupLoading: false,
        signupData: "",
        signupError: ""
    }
}

export const loginReducer = (state = INITIAL_VALUES.login, action) => {
    switch (action.type) {
        case authActionTypes.USER_LOGIN_LOADING:
            return {
                ...state,
                loginLoading: true
            };
        case authActionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                loginLoading: false,
                loginData: action.payload?.data
            };
        case authActionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                loginLoading: false,
            };
        default:
            return state;
    }
}

export const signupReducer = (state = INITIAL_VALUES.signin, action) => {
    switch (action.type) {
        case authActionTypes.USER_SIGNUP_LOADING:
            return {
                ...state,
                signupLoading: true
            };
        case authActionTypes.USER_SIGNUP_SUCCESS:
            return {
                ...state,
                signupLoading: false,
                signupData: action.payload?.data
            };
        case authActionTypes.USER_SIGNUP_FAIL:
            return {
                ...state,
                signupLoading: false,
            };
        default:
            return state;
    }
}