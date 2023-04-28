import { combineReducers } from 'redux'
import { loginReducer } from '../../../pages/Auth/authReducer';

const rootReducer = combineReducers({
    login: loginReducer,
    // signup: signupReducer
});

export default rootReducer;
