import { combineReducers } from "redux";
import covidReducer from "./covid/reducer";
import taskReducer from "./mbTask/reducer";

const rootReducer = combineReducers({
    covidReducer,
    taskReducer,
})

export default rootReducer;