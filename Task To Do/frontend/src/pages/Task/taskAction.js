import { asyncResActionTypes } from "../../config/common/AsyncResponse/asyncConstant";
import Strings from "../../config/common/constants/Strings";
import { deleteMethodCustomHeader, getMethodCustomHeader, postMethodCustomHeader } from "../../config/common/utils/apiResponse";
import taskActionType from "./taskConstant";

export const getTaskAciton = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: asyncResActionTypes.ASYNC_ACTION_START });
            const response = await getMethodCustomHeader('api/todo');
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
            await postMethodCustomHeader('api/todo', objToSend);
            dispatch({ type: taskActionType.POST_TASK });
            dispatch(getTaskAciton());
            dispatch({ type: asyncResActionTypes.ASYNC_ACTION_FINISH });
        } catch (error) {
            console.log("Error :: " + error);
            dispatch({ type: asyncResActionTypes.ASYNC_ACTION_ERROR });
        }
    };
};

export const deleteTaskAciton = (taskId, toast) => {
    return async (dispatch) => {
        try {
            const access = window.confirm("Do you really want to delete?");
            if (access) {
                dispatch({ type: asyncResActionTypes.ASYNC_ACTION_START });
                await deleteMethodCustomHeader(`api/todo/${taskId}`);
                dispatch({ type: taskActionType.DELETE_TASK });
                dispatch(getTaskAciton());
                toast.success("Task Deleted Succesfully")
                dispatch({ type: asyncResActionTypes.ASYNC_ACTION_FINISH });
            }
        } catch (error) {
            console.log("Error :: " + error);
            toast.error(Strings.errorMessage)
            dispatch({ type: asyncResActionTypes.ASYNC_ACTION_ERROR });
        }
    };
};