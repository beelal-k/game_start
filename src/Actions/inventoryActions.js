import {
	ALL_INVENT_FAIL,
	ALL_INVENT_REQUEST,
	ALL_INVENT_SUCCESS,
	ALL_REVIEWS_FAIL,
	ALL_REVIEWS_REQUEST,
	ALL_REVIEWS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	CREATE_INVENT_FAIL,
	CREATE_INVENT_REQUEST,
	CREATE_INVENT_SUCCESS,
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

// get product details
export const getProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_DETAILS_REQUEST,
		});

		const data = await axios.get(`http://localhost:3000/inventory/${id}`);
		console.log(data);
		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data.data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload: error,
		});
	}
};

//create new product
// NEW PRODUCT
export const createProduct = (productData) => async (dispatch) => {
	try {
		dispatch({
			type: CREATE_INVENT_REQUEST,
		});

		const config = {
			headers: { "Content-Type": "application/json" },
		};

		const data = await axios.post(
			`http://localhost:3000/create-inventory`,
			productData,
			config
		);

		dispatch({
			type: CREATE_INVENT_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: CREATE_INVENT_FAIL,
			payload: error,
		});
	}
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
