import * as actionTypes from './types';
import * as authServices from './services';

export const login = ({ credentials }) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.REQUEST_LOADING })
        const data = await authServices.login({ credentials })
        if (data.success === true) {
            const auth_state = {
                current: data.data,
                isLoggedIn: true,
                isLoading: false,
                isSuccess: true,
            };
            window.localStorage.setItem('auth', JSON.stringify(auth_state))
            window.localStorage.setItem('token', data.token)
            dispatch({ type: actionTypes.REQUEST_SUCCESS, payload: data.result })
        } else {
            dispatch({ type: actionTypes.REQUEST_FAILED })
        }
    }
}