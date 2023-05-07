import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { Grid } from "@mui/material";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import { useAlert } from "react-alert";
import { getInventory, clearErrors } from "../../Actions/inventoryActions";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error, loading, products } = useSelector((state) => state.inventory);

	//get cookie and check auth
	const token = Cookies.get("token") || "anything";
	const userId = Cookies.get("user");

	const data = {
		token,
	};

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		try {
			const isAuth = axios.post(
				`http://localhost:3000/verify-user/${userId}`,
				data,
				config
			);

			isAuth.then((c) => {
				console.log(c.data);
				console.log(c.data);
				if (!c.data || c.data == "An error occured") {
					navigate("/login");
				}
			});
		} catch (err) {
			console.log(err);
		}

		dispatch(getInventory());
	}, [dispatch, alert]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<main id="home">
					<div id="container" className="container">
						<Grid container justifyContent="space-around">
							{products &&
								products.map((product, i) => (
									<Grid key={i} item xs={6} sm={4} md={4} lg={3}>
										<ProductCard product={product} width="20vmax" />
									</Grid>
								))}
						</Grid>
					</div>
				</main>
			)}
		</>
	);
};

export default Home;
