import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { Grid } from "@mui/material";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import { useAlert } from "react-alert";
import { getInventory, clearErrors } from "../../Actions/inventoryActions";

const Home = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const { error, loading, products } = useSelector((state) => state.inventory);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		dispatch(getInventory());
	}, [dispatch, error, alert]);

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
