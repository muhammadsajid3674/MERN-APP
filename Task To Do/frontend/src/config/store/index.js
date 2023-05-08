import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk'
import rootReducer from "./RootReducer";
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'taskTodo',
    storage,
    blacklist: ['async', 'modal']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const middlewares = [thunk];
const composeEnhancer = composeWithDevTools(applyMiddleware(...middlewares));
const store = createStore(persistedReducer, composeEnhancer)
const persistor = persistStore(store)

export default store
export { persistor }