import axios from "axios";
import BASE_URI from "../../BASE_URI";
import { actionType } from "../Constant/orderConstant";

export const createOrder = (objToSend) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionType.ORDER_CREATE_REQUEST
            })
            const { userLogin: { userInfo } } = getState();
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.post(`${BASE_URI}/api/order`, objToSend, config)
            dispatch({
                type: actionType.ORDER_CREATE_SUCCESS,
                payload: data
            })
            localStorage.setItem('orderList', JSON.stringify(data))
        } catch (error) {
            dispatch({
                type: actionType.ORDER_CREATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}

export const orderDetail = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionType.ORDER_DETAIL_REQUEST
            })
            const { userLogin: { userInfo } } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.get(`${BASE_URI}/api/order/${id}`, config)
            dispatch({
                type: actionType.ORDER_DETAIL_SUCCESS,
                payload: data
            })
            localStorage.setItem('orderDetail', JSON.stringify(data))
        } catch (error) {
            dispatch({
                type: actionType.ORDER_DETAIL_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}

export const orderPayment = (id, paymentResult) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionType.ORDER_PAY_REQUEST
            })
            const { userLogin: { userInfo } } = getState();
            const config = {
                headers: {
                    "Conten-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.put(`${BASE_URI}/api/order/${id}/pay`, paymentResult, config)
            dispatch({
                type: actionType.ORDER_PAY_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: actionType.ORDER_PAY_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}

export const myOrderList = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionType.ORDER_GET_REQUEST
            })
            const { userLogin: { userInfo } } = getState();
            const config = {
                headers: {
                    "Conten-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.get(`${BASE_URI}/api/order`, config)
            dispatch({
                type: actionType.ORDER_GET_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: actionType.ORDER_GET_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}