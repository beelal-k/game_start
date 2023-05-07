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
import { TextField } from "@mui/material";

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
			navigate("/");
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
					{/* <div className="register-name form-input">
						<FaceIcon color="action" />
						<input
							type="text"
							name="name"
							value={name}
							placeholder="Name"
							required
							onChange={registerDataChange}
						/>
					</div> */}
					<TextField id="outlined-basic" type="name" placeholder="Username" value={name} name="name" required onChange={registerDataChange} required label="Username" variant="outlined" />
					{/* <div className="register-email form-input">
						<MailOutlineIcon color="action" />
						<input
							type="email"
							name="email"
							value={email}
							placeholder="Email"
							required
							onChange={registerDataChange}
						/>
					</div> */}
					<TextField id="outlined-basic" margin="normal" type="email" placeholder="Email" value={email} name="email" required onChange={registerDataChange} required label="Email" variant="outlined" />
					<TextField id="outlined-basic" margin="dense" type="gender" placeholder="Gender" value={gender} name="gender" required onChange={registerDataChange} required label="Gender" variant="outlined" />
					{/* <div className="register-email form-input">
						<MailOutlineIcon color="action" />
						<input
							type="text"
							name="gender"
							value={gender}
							placeholder="Gender"
							required
							onChange={registerDataChange}
						/>
					</div> */}

					<DatePicker
						selected={startDate}
						onChange={(date) => setStartDate(date)}
						className="form-input"
					/>
					<TextField id="outlined-basic" type={showPassword ? "text" : "password"} placeholder="Password" value={password} name="password" required onChange={registerDataChange} label="Password" margin="normal" variant="outlined" />
					{/* <div className="register-password form-input">
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
					*/}
					<div className="eyeWrapper">
						{showPassword ? (
							<VisibilityOffIcon
								color="action"
								className="cursor-pointer eyes"
								onClick={() => {
									setShowPassword(false);
								}}
							/>
						) : (
							<VisibilityIcon
								color="action"
								className="cursor-pointer eyes"
								onClick={() => setShowPassword(true)}
							/>
						)}
					</div>
					{/* // </div> */}

					<button type="submit" className="submitButton form-submit-btn">
						Register
					</button>
				</form >
			)}
		</>
	);
};

export default RegisterForm;
