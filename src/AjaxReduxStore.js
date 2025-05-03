import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dropdownReducer from "./AjaxReduxReducer";

const rootReducer = combineReducers({
    dropdowns: dropdownReducer
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
