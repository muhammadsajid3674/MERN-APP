import { combineReducers } from 'redux'
import authReducer from '../../../pages/Auth/authReducer';
import asyncReducer from '../../common/AsyncResponse/asyncReducer';
import taskReducer from '../../../pages/Task/taskReducer';
import crudReducer from '../../crud/reducers';

const rootReducer = combineReducers({
    auth: authReducer,
    task: taskReducer,
    async: asyncReducer,
    crud: crudReducer
});

export default rootReducer;
