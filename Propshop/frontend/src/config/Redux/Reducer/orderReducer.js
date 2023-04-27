import { actionType } from "../Constant/orderConstant";

export const orderListReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.ORDER_CREATE_REQUEST:
            return {
                loading: true
            };
        case actionType.ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            };
        case actionType.ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export const orderDetailReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case actionType.ORDER_DETAIL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionType.ORDER_DETAIL_SUCCESS:
            return {
                loading: false,
                order: action.payload
            };
        case actionType.ORDER_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export const orderPaymentReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.ORDER_PAY_REQUEST:
            return {
                loading: true
            };
        case actionType.ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case actionType.ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case actionType.ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
}

export const myOrderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case actionType.ORDER_GET_REQUEST:
            return {
                loading: true
            };
        case actionType.ORDER_GET_SUCCESS:
            return {
                loading: false,
                success: true,
                orders: action.payload
            };
        case actionType.ORDER_GET_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case actionType.ORDER_GET_RESET:
            return {
                orders: []
            };
        default:
            return state;
    }
}