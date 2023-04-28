import { combineReducers } from 'redux'
import { loginReducer } from '../../../pages/Login/Reducers'
import { signupReducer } from '../../../pages/Signup/Reducers';

const rootReducer = combineReducers({
    login: loginReducer,
    signup: signupReducer
});

export default rootReducer;
