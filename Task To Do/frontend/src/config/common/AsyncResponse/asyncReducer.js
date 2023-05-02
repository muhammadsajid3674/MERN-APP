import { createReducer } from "../utils/createReducer"
import { asyncResActionTypes } from "./asyncConstant"

const initialState = {
    loading: false,
    elementName: null
}

const asyncActionStart = (state) => {
    return {
        ...state,
        loading: true,
    }
}

const asyncActionFinish = (state, payload) => {
    return {
        ...state,
        loading: false,
        elementName: payload
    }
}

const asyncActionError = (state, payload) => {
    return {
        ...state,
        loading: false,
        error: payload
    }
}

export default createReducer(initialState, {
    [asyncResActionTypes.ASYNC_ACTION_START]: asyncActionStart,
    [asyncResActionTypes.ASYNC_ACTION_FINISH]: asyncActionFinish,
    [asyncResActionTypes.ASYNC_ACTION_ERROR]: asyncActionError,
})