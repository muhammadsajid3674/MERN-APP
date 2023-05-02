import { asyncResActionTypes } from "./asyncConstant"

export const asyncActionStart = () => {
    return {
        type: asyncResActionTypes.ASYNC_ACTION_START
    }
}
export const asyncActionFinish = () => {
    return {
        type: asyncResActionTypes.ASYNC_ACTION_FINISH
    }
}
export const asyncActionError = () => {
    return {
        type: asyncResActionTypes.ASYNC_ACTION_ERROR
    }
}