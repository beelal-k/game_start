import {
	ALL_INVENT_FAIL,
	ALL_INVENT_REQUEST,
	ALL_INVENT_SUCCESS,
	ALL_REVIEWS_FAIL,
	ALL_REVIEWS_REQUEST,
	ALL_REVIEWS_SUCCESS,
	CLEAR_ERRORS,
} from "../Constants/inventoryConstants";

export const inventoryReducer = (state = { inventory: [] }, action) => {
	switch (action.type) {
		case ALL_INVENT_REQUEST:
			return {
				loading: true,
				products: [],
			};

		case ALL_INVENT_SUCCESS:
			return {
				loading: false,
				products: action.payload,
			};

		case ALL_INVENT_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

export const reviewsReducer = (state = { reviews: [] }, action) => {
	switch (action.type) {
		case ALL_REVIEWS_REQUEST:
			return {
				loading: true,
				reviews: [],
			};

		case ALL_REVIEWS_SUCCESS:
			return {
				loading: false,
				reviews: action.payload,
			};

		case ALL_REVIEWS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};
