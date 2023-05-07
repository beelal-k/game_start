import { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import Age from "./Pages/Home/Age";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignup from "./Components/User/LoginSignup/LoginSignup";
// import Age from "react-webcam";

function App() {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route element={<Home />} path="/" exact></Route>
					<Route element={<LoginSignup />} path="/login" exact></Route>
					<Route element={<Age/>} path="/age" exact></Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
