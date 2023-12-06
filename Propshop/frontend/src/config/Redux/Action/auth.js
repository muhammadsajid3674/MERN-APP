import axios from "axios"
import BASE_URI from "../../BASE_URI"
import * as actionType from "../Constant/auth"
import { actionType as orderActionType } from "../Constant/orderConstant"
import { asyncError, asyncFinish, asyncStart } from "../../AsyncHandler/action"
import { request } from '../../request';

export const login = (credentials) => {
    return async (dispatch) => {
        dispatch(asyncStart('login'))
        const result = await request.post('/user/login', credentials)
        if (result.success) {
            window.localStorage.setItem('access_token', result.data.token)
            dispatch({ type: actionType.LOGIN, payload: result.data })
            dispatch(asyncFinish())
        } else {
            return dispatch(asyncError())
        }
    }
}

export const register = (formData) => {
    return async (dispatch) => {
        dispatch(asyncStart())
        const result = await request.post('/user/register', formData)
        if (!result.success) {
            localStorage.setItem('access_token', result.data.token)
            dispatch({ type: actionType.LOGIN, payload: result.data })
            dispatch(asyncFinish('register'))
        } else {
            return dispatch(asyncError())
        }
    }
}


export const logout = () => {
    return async dispatch => {
        localStorage.removeItem('access_token');
        dispatch({ type: actionType.LOGOUT });
    }
}