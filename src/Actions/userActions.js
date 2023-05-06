import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	CLEAR_ERRORS,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	LOGIN_FAIL,
} from "../Constants/userConstants";

import axios from "axios";

// LOGIN
export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: LOGIN_REQUEST });

		console.log(email, password);

		const config = { headers: { "Content-Type": "application/json" } };
		console.log("2");

		const { user } = await axios.post(
			`http://localhost:3000/login`,
			{ email, password },
			config
		);

		console.log("3");

		console.log("user", user);
		dispatch({ type: LOGIN_SUCCESS, payload: user });
	} catch (error) {
		dispatch({ type: LOGIN_FAIL, payload: error });
		console.log(error);
	}
};

//REGISTER
export const register = (userData) => async (dispatch) => {
	try {
		dispatch({ type: REGISTER_USER_REQUEST });

		console.log(userData);
		const config = { headers: { "Content-Type": "application/json" } };
		const { user } = await axios.post(
			`http://localhost:3000/signup`,
			{ userData },
			config
		);

		console.log("userreg", user);

		dispatch({ type: REGISTER_USER_SUCCESS, payload: user });
	} catch (error) {
		dispatch({
			type: REGISTER_USER_FAIL,
			payload: error,
		});
	}
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
