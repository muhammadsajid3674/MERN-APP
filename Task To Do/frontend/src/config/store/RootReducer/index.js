import { combineReducers } from 'redux'
import { loginReducer } from '../../../pages/Login/Reducers'

const rootReducer = combineReducers({
    login: loginReducer
});

export default rootReducer;
