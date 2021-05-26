import LoggedReducer from "./isLogged";
import { configureStore } from "@reduxjs/toolkit"
import {combineReducers} from "redux";
import userReducer from "./infuser";


const allReducers = combineReducers({
    isLogged: LoggedReducer,
    user: userReducer,
});

export default allReducers;