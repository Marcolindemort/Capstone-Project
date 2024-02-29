import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { gamesReducer } from "../reducers/gamesReducer";
import { userReducer } from "../reducers/userReducer";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
	games: gamesReducer,
	account: userReducer,
});

const persistedReducer = persistReducer(
	{
		key: "root",
		storage,
	},
	rootReducer
);

export const store = configureStore({
	reducer: persistedReducer,
});

export const persistedStore = persistStore(store);
