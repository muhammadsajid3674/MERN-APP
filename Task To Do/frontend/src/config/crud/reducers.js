import { createReducer } from "../common/utils/createReducer";
import * as actionTypes from './types';


const INITIAL_KEY_STATE = {
    result: null,
    current: null,
    isLoading: false,
    isSuccess: false,
};

const INITIAL_STATE = {
    current: {
        result: null,
    },
    list: {
        undefined: {
            result: {
                items: [],
                pagination: {
                    current: 1,
                    pageSize: 10,
                    total: 1,
                    showSizeChanger: false,
                },
            },
            isLoading: false,
            isSuccess: false,
        },
    },
    create: INITIAL_KEY_STATE,
    update: INITIAL_KEY_STATE,
    delete: INITIAL_KEY_STATE,
    read: INITIAL_KEY_STATE,
    search: { ...INITIAL_KEY_STATE, result: [] },
};


const resetState = () => {
    return INITIAL_STATE
}

const resetAction = (state, payload, keyState, service) => {
    return {
        ...state,
        [keyState]: {
            [service]: {
                ...INITIAL_STATE[keyState]
            }
        }
    }
}

const currentItem = (state, payload, keyState, service) => {
    return {
        ...state,
        current: {
            [service]: {
                result: payload
            }
        }
    }
}
const currentAction = (state, payload, keyState, service) => {
    return {
        ...state,
        [keyState]: {
            [service]: {
                ...INITIAL_KEY_STATE,
                current: payload,
            }
        },
    };
}

const requestLoading = (state, payload, keyState, service) => {
    return {
        ...state,
        [keyState]: {
            ...state[keyState],
            [service]: {
                ...state[keyState],
                isLoading: true,
            }
        },
    };
}
const requestFailed = (state, payload, keyState, service) => {
    return {
        ...state,
        [keyState]: {
            [service]: {
                ...state[keyState],
                isLoading: false,
                isSuccess: false,
            }
        },
    };
}
const requestSuccess = (state, payload, keyState, service) => {
    return {
        ...state,
        [keyState]: {
            ...state[keyState],
            [service]: {
                result: payload,
                isLoading: false,
                isSuccess: true,
            }
        },
    };
}

const crudReducer = createReducer(INITIAL_STATE, {
    [actionTypes.RESET_STATE]: resetState,
    [actionTypes.RESET_ACTION]: resetAction,
    [actionTypes.CURRENT_ITEM]: currentItem,
    [actionTypes.CURRENT_ACTION]: currentAction,
    [actionTypes.REQUEST_LOADING]: requestLoading,
    [actionTypes.REQUEST_FAILED]: requestFailed,
    [actionTypes.REQUEST_SUCCESS]: requestSuccess,
})

export default crudReducer;