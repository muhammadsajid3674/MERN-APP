import { createReducer } from "../util/createReducer";
import * as actionType from "./constant"

const initialState = {
    loading: false,
    elementName: null
}

const asyncStart = (state, action) => {
    const { payload } = action;
    return {
        ...state,
        loading: true,
        elementName: payload
    }
}

const asyncFinish = (state) => {
    return {
        ...state,
        loading: false,
        elementName: null
    }
}

const asyncError = (state) => {
    return {
        ...state,
        loading: false,
        elementName: null
    }
}

export default createReducer(initialState, {
    [actionType.ASYNC_START]: asyncStart,
    [actionType.ASYNC_FINISH]: asyncFinish,
    [actionType.ASYNC_ERROR]: asyncError,
})