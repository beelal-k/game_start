import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import img from "../../assets/1.jpg";
import { useSelector, useDispatch } from "react-redux";
import { getAllReviews, clearErrors } from "../../Actions/inventoryActions";
import { useAlert } from "react-alert";

const ProductCard = ({ product, width }) => {
	const alert = useAlert();
	const dispatch = useDispatch();

	const { error, reviews } = useSelector((state) => state.reviews);

	const options = {
		value: 4,
		readOnly: true,
		size: "large",
		precision: 0.5,
	};

	let link = `http://localhost:3000/product-reviews/${product.id}`;

	console.log(reviews);
	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		dispatch(getAllReviews(link));
	}, [dispatch, alert, link]);

	return (
		<Link
			className="productCard"
			to={`/product/${product.id}`}
			style={{ width }}
		>
			<img src={img} alt="product img" style={{ width }} />
			<p>{product.title}</p>
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
			<span>
				<strong>Market Price: </strong>
				{`PKR ${product.market_price}`}
			</span>
			<span>
				<strong>Type: </strong>
				{`${product.inventory_type}`}
			</span>
			<span>
				<strong>Minimum Age: </strong>
				{`${product.minimum_age}`}
			</span>
		</Link>
	);
};

export default ProductCard;
