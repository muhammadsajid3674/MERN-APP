import * as actionType from './constant';

export const asyncStart = (service) => ({ type: actionType.ASYNC_START, payload: service })
export const asyncFinish = () => ({ type: actionType.ASYNC_FINISH })
export const asyncError = () => ({ type: actionType.ASYNC_ERROR })