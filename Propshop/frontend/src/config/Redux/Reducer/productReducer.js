import { actionType } from "../Constant/productConstant";

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case actionType.PRODUCT_LIST_REQUEST:
            return {
                loading: true,
                products: []
            };
        case actionType.PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload
            };
        case actionType.PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
}

export const singleProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case actionType.SINGLE_PRODUCT_REQUEST:
            return {
                loading: true,
                product: {}
            };
        case actionType.SINGLE_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload
            };
        case actionType.SINGLE_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
}
export const deleteProductReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.PRODUCT_DELETE_REQUEST:
            return {
                loading: true,
            };
        case actionType.PRODUCT_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case actionType.PRODUCT_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
}