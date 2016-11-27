import { combineReducers, createStore, applyMiddleware } from "redux";
import formReducer from "./reducers/FormReducer"
import logger from "redux-logger"
import thunk from "redux-thunk"

export default createStore(
    combineReducers({
        formReducer
    }),
    {},
    applyMiddleware(logger(), thunk)
);