import axios from "axios"
import { BASE_URI } from "../../BASE_URI"
import * as actionType from '../Constant/cart'
import { request } from "../../request"
import { asyncError, asyncFinish, asyncStart } from "../../AsyncHandler/action"

// export const addToCart = (id, qty) => {
//     return async (dispatch, getState) => {
//         const { data } = await axios.get(`${BASE_URI}/api/product/${id}`)
//         dispatch({
//             type: actionType.CART_ADD_ITEM,
//             payload: {
//                 productId: data.data._id,
//                 name: data.data.name,
//                 image: data.data.image,
//                 price: data.data.price,
//                 countInStock: data.data.countInStock,
//                 qty: parseInt(qty)
//             }
//         });
//         localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
//     };
// };
export const addToCart = (id, qty) => {
    return async (dispatch) => {
        dispatch(asyncStart(actionType.CART_ADD_ITEM))
        const result = await request.get('/api/product/' + id)
        console.log('result :>> ', result);
        if (result.success) {
            result.data.qty = parseInt(qty)
            dispatch({ type: actionType.CART_ADD_ITEM, payload: result.data })
            dispatch(asyncFinish())
        } else {
            return dispatch(asyncError())
        }
    }
}

export const removeFromCart = (id) => {
    return async (dispatch) => {
        dispatch({
            type: actionType.CART_REMOVE_ITEM,
            payload: id
        });
    }
}

export const addShippingAddress = (data) => {
    return async (dispatch) => {
        dispatch({
            type: actionType.ADD_SHIPPING_ADDRESS,
            payload: data
        })
    }
}

export const selectPaymentMethod = (method) => {
    return async (dispatch) => {
        dispatch({
            type: actionType.SELECT_PAYMENT_METHOD,
            payload: method
        })
    }
}