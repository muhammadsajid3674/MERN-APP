import { actionType } from "../Constant/userConstant";

export const userloginReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.USER_LOGIN_REQUEST:
            return {
                loading: true
            };
        case actionType.USER_LOGIN_SUCCESS:
            return {
                loading: false,
                // userInfo: action.payload
            };
        case actionType.USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case actionType.USER_LOGOUT:
            return {
                // userInfo: null
            }

        default:
            return state;
    }
}
export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.USER_REGISTER_REQUEST:
            return {
                loading: true
            };
        case actionType.USER_REGISTER_SUCCESS:
            return {
                loading: false,
                // userInfo: action.payload
            };
        case actionType.USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
}
export const userDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.USER_DETAIL_REQUEST:
            return {
                loading: true
            };
        case actionType.USER_DETAIL_SUCCESS:
            return {
                loading: false,
                user: action.payload
            };
        case actionType.USER_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case actionType.USER_DETAIL_RESET:
            return {};

        default:
            return state;
    }
}
export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.USER_UPDATE_PROFILE_REQUEST:
            return {
                loading: true
            };
        case actionType.USER_UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                success: true,
                // userInfo: action.payload
            };
        case actionType.USER_UPDATE_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case actionType.USER_UPDATE_PROFILE_RESET:
            return {};

        default:
            return state;
    }
}
export const usersListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case actionType.ALL_USER_REQUEST:
            return {
                loading: true
            };
        case actionType.ALL_USER_SUCCESS:
            return {
                loading: false,
                users: action.payload
            };
        case actionType.ALL_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case actionType.ALL_USER_RESET:
            return { users: [] };

        default:
            return state;
    }
}
export const deleteUsersReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.DELETE_USER_REQUEST:
            return {
                loading: true
            };
        case actionType.DELETE_USER_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case actionType.DELETE_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
export const updateUsersReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.UPDATE_USER_REQUEST:
            return {
                loading: true
            };
        case actionType.UPDATE_USER_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case actionType.UPDATE_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case actionType.UPDATE_USER_RESET:
            return {};
        default:
            return state;
    }
}