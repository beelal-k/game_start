import React from "react";
import ProductCard from "./ProductCard";
import { Grid } from "@mui/material";
import "./Home.css";

const Home = () => {
	return (
		<main id="home">
			<div id="container" className="container">
				<Grid container justifyContent="space-around">
					<Grid item xs={6} sm={4} md={4} lg={3}>
						<ProductCard width="20vmax" />
					</Grid>
					{/* {products &&
						products.map((product, i) => (
							<Grid key={i} item xs={6} sm={4} md={4} lg={3}>
								<ProductCard product={product} width="20vmax" />
							</Grid>
						))} */}
				</Grid>
			</div>
		</main>
	);
};

export default Home;
