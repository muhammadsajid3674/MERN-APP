import { combineReducers } from 'redux'
import authReducer from '../../../pages/Auth/authReducer';
import asyncReducer from '../../common/AsyncResponse/asyncReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    async: asyncReducer
});

export default rootReducer;
