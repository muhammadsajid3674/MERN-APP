import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk'
import rootReducer from "./RootReducer";
import { composeWithDevTools } from 'redux-devtools-extension'

const middlewares = [thunk];
const composeEnhancer = composeWithDevTools(applyMiddleware(...middlewares));
const store = createStore(rootReducer, composeEnhancer)

export default store