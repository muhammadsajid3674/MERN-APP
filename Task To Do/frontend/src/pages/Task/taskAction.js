import { asyncResActionTypes } from "../../config/common/AsyncResponse/asyncConstant";
import { getMethodWithoutToken } from "../../config/common/utils/apiResponse";
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