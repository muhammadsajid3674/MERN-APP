import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { cartReducer } from "./Reducer/cartReducer";
import { myOrderListReducer, orderDetailReducer, orderListReducer, orderPaymentReducer } from "./Reducer/orderReducer";
import productReducer from "./Reducer/product";
import { deleteUsersReducer, updateUsersReducer, userDetailReducer, userloginReducer, userRegisterReducer, usersListReducer, userUpdateProfileReducer } from "./Reducer/userReducer";
import authReducer from './Reducer/auth';
import { asyncReducer } from "../AsyncHandler";
import protectedRoutes from "../middleware/protectedRoutes";

const configureStore = () => {
    const reducer = combineReducers({
        auth: authReducer,
        asyncHandler: asyncReducer,
        products: productReducer,
        // singleProduct: singleProductReducer,
        cart: cartReducer,
        orderList: orderListReducer,
        orderDetail: orderDetailReducer,
        userLogin: userloginReducer,
        userRegister: userRegisterReducer,
        userDetail: userDetailReducer,
        userUpdateProfile: userUpdateProfileReducer,
        orderPay: orderPaymentReducer,
        myOrderList: myOrderListReducer,
        usersList: usersListReducer,
        deleteUser: deleteUsersReducer,
        updateUser: updateUsersReducer,
        // deleteProduct: deleteProductReducer
    });

    const cartItemFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : null;
    const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : null;

    const initialState = {
        cart: {
            cartItems: cartItemFromStorage,
            shippingAddress: shippingAddressFromStorage,
            paymentMethod: paymentMethodFromStorage
        },
        userLogin: { userInfo: userInfoFromStorage }
    };

    const middlewares = [thunk, protectedRoutes];

    const composeEnhancer = composeWithDevTools(applyMiddleware(...middlewares))

    const store = createStore(reducer, initialState, composeEnhancer)

    return store;
}

export default configureStore;