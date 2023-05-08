import { combineReducers } from 'redux'
import authReducer from '../../../pages/Auth/authReducer';
import asyncReducer from '../../common/AsyncResponse/asyncReducer';
import taskReducer from '../../../pages/Task/taskReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    task: taskReducer,
    async: asyncReducer,
});

export default rootReducer;
