import { asyncResActionTypes } from "../../config/common/AsyncResponse/asyncConstant";
import { getMethodWithoutToken, postMethodWithoutToken } from "../../config/common/utils/apiResponse";
import taskActionType from "./taskConstant";

export const getTaskAciton = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: asyncResActionTypes.ASYNC_ACTION_START });
            const response = await getMethodWithoutToken('api/todo');
            dispatch({ type: taskActionType.GET_TASK, payload: response });
            dispatch({ type: asyncResActionTypes.ASYNC_ACTION_FINISH });
        } catch (error) {
            console.log("Error :: " + error);
            dispatch({ type: asyncResActionTypes.ASYNC_ACTION_ERROR });
        }
    };
};

export const postTaskAciton = (obj, toast, currentUserId) => {
    return async (dispatch) => {
        try {
            const { dueDate, ...rest } = obj
            const datetypeChange = new Date(dueDate);
            const objToSend = { ...rest, dueDate: datetypeChange, user: currentUserId, completed: false };
            dispatch({ type: asyncResActionTypes.ASYNC_ACTION_START });
            await postMethodWithoutToken('api/todo', objToSend);
            dispatch({ type: taskActionType.POST_TASK });
            dispatch(getTaskAciton());
            dispatch({ type: asyncResActionTypes.ASYNC_ACTION_FINISH });
        } catch (error) {
            console.log("Error :: " + error);
            dispatch({ type: asyncResActionTypes.ASYNC_ACTION_ERROR });
        }
    };
};