import signupActionTypes from "../Constant";

const INITIAL_VALUES = {
    signupLoading: false,
    signupData: "",
    signupError: ""
}

export const signupReducer = (state = INITIAL_VALUES, action) => {
    switch (action.type) {
        case signupActionTypes.USER_SIGNUP_LOADING:
            return {
                ...state,
                signupLoading: true
            };
        case signupActionTypes.USER_SIGNUP_SUCCESS:
            return {
                ...state,
                signupLoading: false,
                signupData: action.payload?.data
            };
        case signupActionTypes.USER_SIGNUP_FAIL:
            return {
                ...state,
                signupLoading: false,
            };
        default:
            return state;
    }
}