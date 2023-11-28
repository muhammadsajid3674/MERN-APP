import request from '../common/request/request';
import * as actionTypes from './types';

export const crud = {
    resetState: () => {
        return async (dispatch) => {
            dispatch({
                type: actionTypes.RESET_STATE
            })
        }
    },
    resetAction: ({ actionType, service }) => {
        return async (dispatch) => {
            dispatch({
                type: actionTypes.RESET_ACTION,
                keyState: actionType,
                payload: null,
                service
            })
        }
    },
    currentItem: ({ data }) => {
        return async (dispatch) => {
            dispatch({
                type: actionTypes.CURRENT_ITEM,
                payload: { ...data }
            })
        }
    },
    currentAction: ({ actionType, data }) => {
        return async (dispatch) => {
            dispatch({
                type: actionTypes.CURRENT_ITEM,
                keyState: actionType,
                payload: { ...data }
            })
        }
    },
    create: ({ endPoint, jsonData, service, withUpload = false }) => {
        return async (dispatch) => {
            dispatch({
                type: actionTypes.REQUEST_LOADING,
                keyState: 'create',
                payload: null,
                service
            })
            let result = await request.create({ endPoint, jsonData })
            if (result.success === true) {
                dispatch({
                    type: actionTypes.REQUEST_SUCCESS,
                    keyState: 'create',
                    payload: result.data,
                    service
                });
                dispatch({
                    type: actionTypes.CURRENT_ITEM,
                    payload: result.data,
                    service
                });
            } else {
                dispatch({
                    type: actionTypes.REQUEST_FAILED,
                    keyState: 'create',
                    payload: null,
                    service
                });
            }
        }
    },
    list: ({ endPoint, service, options = { page: 1, items: 10 } }) => {
        return async (dispatch) => {
            dispatch({
                type: actionTypes.REQUEST_LOADING,
                keyState: 'list',
                payload: null,
                service,
            })
            try {
                let response = await request.list({ endPoint, options });
                if (response.success === true) {
                    const result = {
                        items: response.data,
                        pagination: {
                            current: parseInt(response?.pagination?.page, 10),
                            pageSize: options?.items,
                            total: parseInt(response?.pagination?.count, 10),
                        }
                    }
                    dispatch({
                        type: actionTypes.REQUEST_SUCCESS,
                        keyState: 'list',
                        payload: result,
                        service
                    });
                }
            } catch (error) {
                dispatch({
                    type: actionTypes.REQUEST_FAILED,
                    keyState: 'list',
                    payload: null,
                    service
                });
            }
        }
    },
    read: (endPoint, id) => {
        return async (dispatch) => {
            dispatch({
                type: actionTypes.REQUEST_LOADING,
                keyState: 'read',
                payload: null
            })
            try {
                let response = await request.read({ endPoint, id });
                if (response.success === true) {
                    dispatch({
                        type: actionTypes.CURRENT_ITEM,
                        payload: response.data
                    })
                    dispatch({
                        type: actionTypes.REQUEST_SUCCESS,
                        keyState: 'read',
                        payload: response.data
                    });
                }
            } catch (error) {
                dispatch({
                    type: actionTypes.REQUEST_FAILED,
                    keyState: 'read',
                    payload: null,
                });
            }
        }
    }
}