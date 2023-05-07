import { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import Age from "./Pages/Home/Age";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignup from "./Components/User/LoginSignup/LoginSignup";
// import { Dashboard } from "@mui/icons-material";
import Dashboard from './Pages/Home/Dashboard.jsx'
import CreateInventory from "./Pages/CreateInventory";
import Inventory from "./Pages/Inventory";

function App() {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route element={<Home />} path="/" exact></Route>
					<Route element={<LoginSignup />} path="/login" exact></Route>
					<Route element={<Age/>} path="/age" exact></Route>
					<Route element={<CreateInventory/>} path="/create-inventory" exact></Route>
					<Route element={<Dashboard/>} path="/dashboard" exact></Route>
					<Route element={<Inventory/>} path="/inventory" exact></Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
