import { combineReducers } from "redux";
import santaReducer from "./santa";

export default combineReducers({
    santa: santaReducer
});
