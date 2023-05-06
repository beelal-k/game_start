import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/userReducer";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const customizedMiddleware = getDefaultMiddleware({
	serializableCheck: false,
});

export const store = configureStore({
	reducer: { user: userReducer },
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
