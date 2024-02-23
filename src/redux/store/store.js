import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { gamesReducer } from "../reducers/gamesReducer";
import { userReducer } from "../reducers/userReducer";

const rootReducer = combineReducers({
	games: gamesReducer,
	account: userReducer,
});

export const store = configureStore({
	reducer: rootReducer,
});
