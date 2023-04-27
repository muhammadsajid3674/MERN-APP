import axios from "axios"
import BASE_URI from "../../BASE_URI"
import { actionType } from "../Constant/userConstant"
import { actionType as orderActionType } from "../Constant/orderConstant"

export const login = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionType.USER_LOGIN_REQUEST
            })
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.post(`${BASE_URI}/api/user/login`, { email, password }, config)
            dispatch({
                type: actionType.USER_LOGIN_SUCCESS,
                payload: data
            })
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: actionType.USER_LOGIN_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}

export const register = (name, email, password) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionType.USER_REGISTER_REQUEST
            })
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.post(`${BASE_URI}/api/user`, { name, email, password }, config)
            dispatch({
                type: actionType.USER_REGISTER_SUCCESS,
                payload: data
            })
            dispatch({
                type: actionType.USER_LOGIN_SUCCESS,
                payload: data
            })
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: actionType.USER_REGISTER_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}
export const getUserDetails = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionType.USER_DETAIL_REQUEST
            })
            const { userLogin: { userInfo } } = getState();
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.get(`${BASE_URI}/api/user/profile`, config)
            dispatch({
                type: actionType.USER_DETAIL_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: actionType.USER_DETAIL_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}
export const updateUserProfile = (objToSend) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionType.USER_UPDATE_PROFILE_REQUEST
            })
            const { userLogin: { userInfo } } = getState();
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.put(`${BASE_URI}/api/user/profile`, objToSend, config)
            dispatch({
                type: actionType.USER_UPDATE_PROFILE_SUCCESS,
                payload: data
            })
            dispatch({
                type: actionType.USER_LOGIN_SUCCESS,
                payload: data
            })
            localStorage.setItem('userInfo', JSON.stringify(data))
        } catch (error) {
            dispatch({
                type: actionType.USER_UPDATE_PROFILE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}

export const getUsersList = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionType.ALL_USER_REQUEST
            })
            const { userLogin: { userInfo } } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.get(`${BASE_URI}/api/user`, config)
            dispatch({
                type: actionType.ALL_USER_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: actionType.ALL_USER_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}

export const deleteUser = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionType.DELETE_USER_REQUEST
            })
            const { userLogin: { userInfo } } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            await axios.delete(`${BASE_URI}/api/user/${id}`, config)
            dispatch({ type: actionType.DELETE_USER_SUCCESS })
        } catch (error) {
            dispatch({
                type: actionType.DELETE_USER_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}

export const UpdateUser = (id, objToSend) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionType.UPDATE_USER_REQUEST
            })
            const { userLogin: { userInfo } } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const {data } = await axios.put(`${BASE_URI}/api/user/${id}`, objToSend, config)
            dispatch({ type: actionType.UPDATE_USER_SUCCESS })
            dispatch({
                type: actionType.USER_LOGIN_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: actionType.UPDATE_USER_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}


export const logout = () => {
    return async dispatch => {
        localStorage.removeItem('userInfo')
        dispatch({
            type: actionType.USER_LOGOUT
        })
        dispatch({
            type: orderActionType.ORDER_GET_RESET
        })
        dispatch({
            type: actionType.USER_DETAIL_RESET
        })
        dispatch({
            type: actionType.ALL_USER_RESET
        })
        dispatch({
            type: actionType.UPDATE_USER_RESET
        })
    }
}