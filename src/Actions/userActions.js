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
import Cookies from "js-cookie";

// LOGIN
export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: LOGIN_REQUEST });

		const config = { headers: { "Content-Type": "application/json" } };

		const user = await axios.post(
			`http://localhost:3000/login`,
			{ email, password },
			config
		);

		const token = user.data.token;
		const userId = user.data.user.id;

		Cookies.set("token", token, { expires: 7 });
		Cookies.set("user", userId, { expires: 7 });

		dispatch({ type: LOGIN_SUCCESS, payload: user.data });
	} catch (error) {
		dispatch({ type: LOGIN_FAIL, payload: error });
	}
};

//REGISTER
export const register = (userData) => async (dispatch) => {
	try {
		dispatch({ type: REGISTER_USER_REQUEST });

		console.log(userData);
		const config = { headers: { "Content-Type": "application/json" } };
		const user = await axios.post(
			`http://localhost:3000/signup`,
			userData,
			config
		);

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
