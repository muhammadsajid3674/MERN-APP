import { createReducer } from "../../config/common/utils/createReducer"
import taskActionType from "./taskConstant"

const INITIAL_VALUES = {
    task: null
}

const getTask = (state, payload) => {
    return payload?.data
}

export default createReducer(INITIAL_VALUES, {
    [taskActionType.GET_TASK]: getTask
})