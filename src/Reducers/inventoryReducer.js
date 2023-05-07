import {
	ALL_INVENT_FAIL,
	ALL_INVENT_REQUEST,
	ALL_INVENT_SUCCESS,
	ALL_REVIEWS_FAIL,
	ALL_REVIEWS_REQUEST,
	ALL_REVIEWS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_REQUEST,
	CREATE_INVENT_FAIL,
	CREATE_INVENT_REQUEST,
	CREATE_INVENT_SUCCESS,
	CREATE_INVENT_RESET,
	CLEAR_ERRORS,
	ADD_CART_REQUEST,
	ADD_CART_SUCCESS,
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

export const productDetailsReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return {
				loading: true,
				...state,
			};
		case PRODUCT_DETAILS_SUCCESS:
			return {
				loading: false,
				product: action.payload,
			};
		case PRODUCT_DETAILS_FAIL:
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

export const newInventoryReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case CREATE_INVENT_REQUEST:
			return {
				...state,
				loading: true,
				success: false,
			};
		case CREATE_INVENT_SUCCESS:
			return {
				loading: false,
				success: true,
				product: action.payload.data,
			};
		case CREATE_INVENT_FAIL:
			return {
				...state,
				loading: false,
				success: false,
				error: action.payload,
			};
		case CREATE_INVENT_RESET:
			return {
				...state,
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

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case ADD_CART_REQUEST:
			const item = action.payload;
			const isItemExist = state.cartItems.find(
				(i) => i.product === item.product
			);

			if (isItemExist) {
				return {
					...state,
					cartItems: state.cartItems.map((i) =>
						i.product === isItemExist.product ? item : i
					),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}

		case ADD_CART_SUCCESS:
			return {
				...state,
				cartItems: state.cartItems.filter((i) => i.product !== action.payload),
			};

		default:
			return state;
	}
};
