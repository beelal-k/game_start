import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/userReducer";
import { inventoryReducer, reviewsReducer } from "./Reducers/inventoryReducer";

export const store = configureStore({
	reducer: {
		user: userReducer,
		inventory: inventoryReducer,
		reviews: reviewsReducer,
	},
});
