import { createReducer } from '../../util/createReducer';
import * as actionType from '../Constant/auth';

const initialState = {
    authenticated: false,
    currentUser: null
}

export const login = (state, action) => {
    const { payload } = action;
    return {
        authenticated: true,
        currentUser: payload
    }
}
export const register = (state, action) => {
    const { payload } = action;
    return {
        authenticated: true,
        currentUser: payload
    }
}

export const logout = (state, action) => {
    return {
        authenticated: false,
        currentUser: null
    }
}

export default createReducer(initialState, {
    [actionType.LOGIN]: login,
    [actionType.REGISTER]: register,
    [actionType.LOGOUT]: logout,
})