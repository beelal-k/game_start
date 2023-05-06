import React, { useEffect, useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PasswordIcon from "@mui/icons-material/Password";
import "./LoginForm.css";
import { Link } from "react-router-dom";
// import Loader from "../../loader/Loader";
import { useNavigate, useLocation } from "react-router-dom";

//////
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../../Actions/userActions";
// import { useAlert } from "react-alert";

const LoginForm = () => {
	const dispatch = useDispatch();
	// const alert = useAlert();
	const navigate = useNavigate();
	const location = useLocation();

	const { error, isAuthenticated } = useSelector((state) => state.user);

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const loginSubmit = (e) => {
		e.preventDefault();

		dispatch(login(loginEmail, loginPassword));
	};

	const redirect = location.search ? location.search.split("=")[1] : "account";

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isAuthenticated) {
			navigate(`/${redirect}`);
		}
	}, [error, dispatch, navigate, isAuthenticated, redirect]);

	return (
		<>
			{/* {loading ? (
				<Loader />
			) : ( */}
			<form className="login-form" onSubmit={loginSubmit}>
				<div className="login-email form-input">
					<MailOutlineIcon color="action" />
					<input
						type="email"
						name="login-email"
						value={loginEmail}
						placeholder="Email"
						required
						onChange={(e) => setLoginEmail(e.target.value)}
					/>
				</div>
				<div className="login-password form-input">
					<PasswordIcon color="action" />
					<input
						type="password"
						name="login-password"
						value={loginPassword}
						placeholder="Password"
						required
						onChange={(e) => setLoginPassword(e.target.value)}
					/>
				</div>
				<Link to="/password/forgot" className="forgot-pass">
					Forgot Password?
				</Link>
				<button type="submit" className="submitButton form-submit-btn">
					Login
				</button>
			</form>
			{/* )} */}
		</>
	);
};

export default LoginForm;
