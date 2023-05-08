import { asyncResActionTypes } from "../../config/common/AsyncResponse/asyncConstant";
import Strings from "../../config/common/constants/Strings";
import { TaskApi } from "../../config/common/utils/api";
import taskActionType from "./taskConstant";

const taskApi = new TaskApi();
export const getTaskAciton = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: asyncResActionTypes.ASYNC_ACTION_START });
            // const response = await getMethodCustomHeader('/todo');
            await taskApi.getTaskList().then(response => {
                dispatch({ type: taskActionType.GET_TASK, payload: response });
                dispatch({ type: asyncResActionTypes.ASYNC_ACTION_FINISH });
            }).catch(err => {
                console.log(err);
                dispatch({ type: asyncResActionTypes.ASYNC_ACTION_ERROR, payload: { err } });
            })
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
            // await postMethodCustomHeader('api/todo', objToSend);
            await taskApi.addNewTask(currentUserId, objToSend).then(() => {
                dispatch({ type: taskActionType.POST_TASK });
                dispatch(getTaskAciton());
                dispatch({ type: asyncResActionTypes.ASYNC_ACTION_FINISH });
                toast.success(Strings.toaster.addTask)
            }).catch(err => {
                dispatch({ type: asyncResActionTypes.ASYNC_ACTION_ERROR });
                console.log(err);
            })
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
                // await deleteMethodCustomHeader(`api/todo/${taskId}`);
                await taskApi.deleteTask(taskId).then(() => {
                    dispatch({ type: taskActionType.DELETE_TASK });
                    dispatch(getTaskAciton());
                    toast.success("Task Deleted Succesfully")
                    dispatch({ type: asyncResActionTypes.ASYNC_ACTION_FINISH });
                }).catch(err => {
                    console.log(err);
                    dispatch({ type: asyncResActionTypes.ASYNC_ACTION_ERROR });
                })
            }
        } catch (error) {
            console.log("Error :: " + error);
            toast.error(Strings.errorMessage)
            dispatch({ type: asyncResActionTypes.ASYNC_ACTION_ERROR });
        }
    };
};