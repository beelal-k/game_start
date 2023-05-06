import {
	ALL_INVENT_FAIL,
	ALL_INVENT_REQUEST,
	ALL_INVENT_SUCCESS,
	ALL_REVIEWS_FAIL,
	ALL_REVIEWS_REQUEST,
	ALL_REVIEWS_SUCCESS,
	CLEAR_ERRORS,
} from "../Constants/inventoryConstants";
import axios from "axios";

// LOGIN
export const getInventory = () => async (dispatch) => {
	try {
		dispatch({ type: ALL_INVENT_REQUEST });

		const inven = await axios.get(`http://localhost:3000/all-inventory`);

		dispatch({ type: ALL_INVENT_SUCCESS, payload: inven.data });
	} catch (error) {
		dispatch({ type: ALL_INVENT_FAIL, payload: error });
	}
};

// LOGIN
export const getAllReviews = (link) => async (dispatch) => {
	try {
		dispatch({ type: ALL_REVIEWS_REQUEST });

		const rev = await axios.get(link);

		dispatch({ type: ALL_REVIEWS_SUCCESS, payload: rev.data });
	} catch (error) {
		dispatch({ type: ALL_REVIEWS_FAIL, payload: error });
	}
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
