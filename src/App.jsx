import { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignup from "./Components/User/LoginSignup/LoginSignup";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import CreateInventory from "./Pages/Inventory/CreateInventory/CreateInventory";

function App() {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route element={<Home />} path="/" exact></Route>
					<Route element={<LoginSignup />} path="/login" exact></Route>
					<Route element={<ProductDetails />} path="/product/:id" exact></Route>
					<Route
						element={<CreateInventory />}
						path="/create-inventory"
						exact
					></Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
