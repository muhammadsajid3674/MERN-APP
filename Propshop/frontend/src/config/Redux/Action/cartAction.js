import axios from "axios"
import BASE_URI from "../../BASE_URI"
import { actionType } from "../Constant/cartConstant"

export const addToCart = (id, qty) => {
    return async (dispatch, getState) => {
        const { data } = await axios.get(`${BASE_URI}/api/product/${id}`)
        dispatch({
            type: actionType.CART_ADD_ITEM,
            payload: {
                productId: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty: parseInt(qty)
            }
        });
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    };
};

export const removeFromCart = (productId) => {
    return async (dispatch, getState) => {
        dispatch({
            type: actionType.CART_REMOVE_ITEM,
            payload: productId
        });
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    }
}

export const addShippingAddress = (data) => {
    return async (dispatch) => {
        dispatch({
            type: actionType.ADD_SHIPPING_ADDRESS,
            payload: data
        })
        localStorage.setItem('shippingAddress', JSON.stringify(data))
    }
}

export const selectPaymentMethod = (method) => {
    return async (dispatch) => {
        dispatch({
            type: actionType.SELECT_PAYMENT_METHOD,
            payload: method
        })
        localStorage.setItem('paymentMethod', JSON.stringify(method))
    }
}