import React, { useState } from "react";
import "./LoginSignup.css";
import { Box, Tabs, Tab } from "@mui/material";
import LoginForm from "../../Forms/LoginForm/LoginForm";
import RegisterForm from "../../Forms/SignupForm/SignupForm";

function LoginSignup() {
	const [tab, setTab] = useState(0);
	const [loginForm, setloginForm] = useState(true);

	return (
		<div className="form-box">
			<Box>
				<Tabs
					value={tab}
					onChange={(e, newValue) => {
						setTab(newValue);
						setloginForm(!loginForm);
					}}
					centered
					selectionFollowsFocus
					variant="fullWidth"
				>
					<Tab label="Login" />
					<Tab label="Register" />
				</Tabs>
			</Box>
			{loginForm ? <LoginForm /> : <RegisterForm />}
		</div>
	);
}

export default LoginSignup;
