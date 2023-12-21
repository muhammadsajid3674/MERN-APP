import { createReducer } from '../../util/createReducer';
import * as actionType from '../Constant/cart'

// export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
//     switch (action.type) {
//         case actionType.CART_ADD_ITEM:
//             const item = action.payload
//             const existItem = state.cartItems.find(e => e.productId === item.productId);
//             if (existItem) {
//                 return {
//                     ...state,
//                     cartItems: state.cartItems.map(e => e.productId === existItem.productId ? item : e)
//                 };
//             } else {
//                 return {
//                     ...state,
//                     cartItems: [...state.cartItems, item]
//                 };
//             };
//         case actionType.CART_REMOVE_ITEM:
//             return {
//                 ...state,
//                 cartItems: state.cartItems.filter(elem => elem.productId !== action.payload)
//             };
//         case actionType.ADD_SHIPPING_ADDRESS:
//             return {
//                 ...state,
//                 shippingAddress: action.payload
//             }
//         case actionType.SELECT_PAYMENT_METHOD:
//             return {
//                 ...state,
//                 paymentMethod: action.payload
//             }
//         default:
//             return state;
//     }
// }

const initialState = {
    items: [],
    shippingAddress: {},
    paymentMethod: '',
    count: 0
}

const addToCart = (state, action) => {
    const { payload } = action
    console.log('state :>> ', state);
    const existingItem = state.items.find(e => e._id === payload._id)
    console.log('existingItem :>> ', existingItem);
    state.count++;
    if (existingItem) {
        return {
            ...state,
            items: state.items.map(e => e._id === existingItem._id ? payload : e),
        }
    } else {
        return {
            ...state,
            items: [...state.items, payload]
        }
    }
}

const removeFromCart = (state, action) => {
    const { payload } = action
    state.count--;
    return {
        ...state,
        items: state.items.filter(e => e._id !== payload)
    }
}

const shippingAddress = (state, action) => {
    const { payload } = action
    return {
        ...state,
        shippingAddress: payload
    }
}

const paymentMethod = (state, action) => {
    const { payload } = action
    return {
        ...state,
        paymentMethod: payload
    }
}

export default createReducer(initialState, {
    [actionType.CART_ADD_ITEM]: addToCart,
    [actionType.CART_REMOVE_ITEM]: removeFromCart,
    [actionType.ADD_SHIPPING_ADDRESS]: shippingAddress,
    [actionType.SELECT_PAYMENT_METHOD]: paymentMethod,
})