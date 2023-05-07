import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/userReducer";
import {
	inventoryReducer,
	productDetailsReducer,
	reviewsReducer,
	newInventoryReducer,
	cartReducer,
} from "./Reducers/inventoryReducer";

export const store = configureStore({
	reducer: {
		user: userReducer,
		inventory: inventoryReducer,
		reviews: reviewsReducer,
		productDetails: productDetailsReducer,
		newInventory: newInventoryReducer,
		cart: cartReducer,
	},
});
