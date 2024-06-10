import { compose, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import mainReducer from "./mainReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function GenerateStore() {
    return createStore(mainReducer, composeEnhancers(applyMiddleware(thunk)));
};
