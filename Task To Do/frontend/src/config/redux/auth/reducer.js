import { createReducer } from "../../common/utils/createReducer";
import * as actionTypes from './types';

const INITIAL_STATE = {
    current: {},
    isLoggedIn: false,
    isLoading: false,
    isSuccess: false,
};

const requestLoading = (state) => {
    return {
        ...state,
        isLoading: true
    }
}
const requestFailed = (state) => {
    return {
        ...state,
        isLoading: false,
        isSuccess: false
    }
}
const requestSuccess = (state, payload) => {
    return {
        isLoading: false,
        isSuccess: true,
        isLoggedIn: true,
        current: payload
    }
}
const logout = () => {
    return INITIAL_STATE
}

export default createReducer(INITIAL_STATE, {
    [actionTypes.LOADING_REQUEST]: requestLoading,
    [actionTypes.REQUEST_FAILED]: requestFailed,
    [actionTypes.REQUEST_SUCCESS]: requestSuccess,
    [actionTypes.LOGOUT_SUCCESS]: logout,
})