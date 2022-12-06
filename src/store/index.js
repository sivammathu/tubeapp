import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, createStore } from "redux";
// import { authReducers } from "./reducers/authred";
import authReducers from "./toolKit/authSlice";
import videoReducers from "./toolKit/videoSlice";
import commonReducers from "./toolKit/commonSlice";

// export const store = createStore(authReducers);

const combndReducer = combineReducers({
	auth: authReducers,
	video: videoReducers,
	common: commonReducers,
});

export const store = configureStore({
	reducer: combndReducer,
});
