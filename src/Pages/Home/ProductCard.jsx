import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import img from "../../assets/1.jpg";

const ProductCard = ({ width }) => {
	const options = {
		value: 2.5,
		readOnly: true,
		size: "large",
		precision: 0.5,
	};

	return (
		<Link
			className="productCard"
			to={`/product/$product id}`}
			style={{ width }}
		>
			<img src={img} alt="product img" style={{ width }} />
			<p>Gaming Gear</p>
			<div>
				<Rating {...options} style={{ font: "300 1.2rem 'Roboto'" }} />{" "}
				<span
					style={{
						font: "300 0.7rem 'Roboto'",
						marginTop: "2px",
						marginLeft: "10px",
					}}
				>
					({1000} Reviews)
				</span>
			</div>
			<span>{`$${200}`}</span>
		</Link>
	);
};

export default ProductCard;
