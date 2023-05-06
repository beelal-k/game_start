import { userReducer } from "../Reducers/userReducer";
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	CLEAR_ERRORS,
	LOGIN_FAIL,
} from "../Constants/userConstants";

import axios from "axios";

// LOGIN
export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: LOGIN_REQUEST });

		const config = { headers: { "Content-Type": "application/json" } };

		const { data } = await axios.post(`/login`, { email, password }, config);

		dispatch({ type: LOGIN_SUCCESS, payload: data.user });
	} catch (error) {
		dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
	}
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
