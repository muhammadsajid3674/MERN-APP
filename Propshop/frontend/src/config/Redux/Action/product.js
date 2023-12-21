import axios from "axios"
import {BASE_URI} from "../../BASE_URI"
import * as actionType from "../Constant/product"
import { asyncError, asyncFinish, asyncStart } from "../../AsyncHandler/action"
import { request } from "../../request"

export const fetchProductList = () => {
    return async (dispatch) => {
        dispatch(asyncStart('product'))
        const result = await request.get('/api/product');
        if (result) {
            dispatch({
                type: actionType.PRODUCT_LIST,
                payload: result?.data
            })
            dispatch(asyncFinish())
        } else {
            return dispatch(asyncError())
        }
    }
}

export const fetchSingleProduct = (id) => {
    return async (dispatch) => {
        dispatch(asyncStart(actionType.SINGLE_PRODUCT))
        const result = await request.get('/api/product/' + id);
        if (result) {
            dispatch({
                type: actionType.SINGLE_PRODUCT,
                payload: result?.data
            })
            dispatch(asyncFinish())
        } else {
            return dispatch(asyncError())
        }
    }
}

export const searchProduct = (searchQuery) => {
    return async (dispatch) => {
        dispatch(asyncStart(actionType.SEARCH_PRODUCT))
        const result = await request.search('/api/product', { name: searchQuery });
        if (result) {
            dispatch({
                type: actionType.SEARCH_PRODUCT,
                payload: result?.data
            })
            dispatch(asyncFinish())
        } else {
            return dispatch(asyncError())
        }
    }
}

// export const fetchSingleProduct = (id) => {
//     return async (dispatch) => {
//         try {
//             dispatch({ type: actionType.SINGLE_PRODUCT_REQUEST })
//             const { data } = await axios.get(`${BASE_URI}/api/product/${id}`);
//             dispatch({
//                 type: actionType.SINGLE_PRODUCT_SUCCESS,
//                 payload: data
//             })
//         } catch (error) {
//             dispatch({
//                 type: actionType.SINGLE_PRODUCT_FAIL,
//                 payload: error.response && error.response.data.message ? error.response.data.message : error.message
//             })
//         }
//     }
// }

// export const deleteProduct = (id) => {
//     return async (dispatch, getState) => {
//         try {
//             dispatch({ type: actionType.PRODUCT_DELETE_REQUEST })
//             const { userLogin: { userInfo } } = getState();
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${userInfo.token}`
//                 }
//             }
//             const { data } = await axios.delete(`${BASE_URI}/api/product/${id}`, config);
//             dispatch({
//                 type: actionType.PRODUCT_DELETE_SUCCESS,
//                 payload: data
//             })
//         } catch (error) {
//             dispatch({
//                 type: actionType.PRODUCT_DELETE_FAIL,
//                 payload: error.response && error.response.data.message ? error.response.data.message : error.message
//             })
//         }
//     }
// } 