import React, { useEffect, useRef, useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PasswordIcon from "@mui/icons-material/Password";
import FaceIcon from "@mui/icons-material/Face";
import "./SignupForm.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

////////
import { clearErrors, register } from "../../../Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

const RegisterForm = () => {
	const [startDate, setStartDate] = useState(new Date());
	const registerTab = useRef(null);
	const [showPassword, setShowPassword] = useState(false);
	/////////

	const dispatch = useDispatch();
	const alert = useAlert();
	const navigate = useNavigate();

	/////////

	const { error, isAuthenticated, loading } = useSelector(
		(state) => state.user
	);

	/////////

	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
		gender: "",
		dob: "",
	});

	const { name, email, password, gender } = user;

	const registerSubmit = (e) => {
		e.preventDefault();

		const userData = {
			name: name.toString(),
			password: password.toString(),
			email: email.toString(),
			gender: gender.toString(),
			dob: startDate.toString(),
		};

		// const { name2, password2, email2, gender2, dob2 } = userData;

		dispatch(register(userData));
	};

	const registerDataChange = (e) => {
		setUser({ ...user, [e.target.name]: [e.target.value] });
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isAuthenticated) {
			navigate("/account");
		}
	}, [error, dispatch, navigate]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<form
					className="register-form"
					ref={registerTab}
					onSubmit={registerSubmit}
				>
					<div className="register-name form-input">
						<FaceIcon color="action" />
						<input
							type="text"
							name="name"
							value={name}
							placeholder="Name"
							required
							onChange={registerDataChange}
						/>
					</div>
					<div className="register-email form-input">
						<MailOutlineIcon color="action" />
						<input
							type="email"
							name="email"
							value={email}
							placeholder="Email"
							required
							onChange={registerDataChange}
						/>
					</div>
					<div className="register-email form-input">
						<MailOutlineIcon color="action" />
						<input
							type="text"
							name="gender"
							value={gender}
							placeholder="Gender"
							required
							onChange={registerDataChange}
						/>
					</div>

					<DatePicker
						selected={startDate}
						onChange={(date) => setStartDate(date)}
						className="form-input"
					/>
					<div className="register-password form-input">
						<PasswordIcon color="action" />
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							style={{ width: "217px" }}
							value={password}
							placeholder="Password"
							required
							onChange={registerDataChange}
						/>
						{showPassword ? (
							<VisibilityOffIcon
								color="action"
								className="cursor-pointer"
								onClick={() => {
									setShowPassword(false);
								}}
							/>
						) : (
							<VisibilityIcon
								color="action"
								className="cursor-pointer"
								onClick={() => setShowPassword(true)}
							/>
						)}
					</div>

					<button type="submit" className="submitButton form-submit-btn">
						Register
					</button>
				</form>
			)}
		</>
	);
};

export default RegisterForm;