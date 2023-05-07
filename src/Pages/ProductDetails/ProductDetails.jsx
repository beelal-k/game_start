import React, { useEffect, useState } from "react";
import "./productDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../Actions/inventoryActions";
// import ReviewCard from "./ReviewCard";
import Loader from "../../Components/Loader/Loader";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import img from "../../assets/1.jpg";
import { addItemsToCart } from "../../Actions/inventoryActions";
import {
	Dialog,
	DialogActions,
	DialogContent,
	Button,
	DialogTitle,
	Rating,
} from "@mui/material";
// import { NEW_REVIEW_RESET } from "../../constants/productConstant";

const ProductDetails = () => {
	const dispatch = useDispatch();
	const alert = useAlert();

	const { product, loading, error } = useSelector(
		(state) => state.productDetails
	);

	// const { success, error: reviewError } = useSelector(
	// 	(state) => state.newReview
	// );

	const { id } = useParams();

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		// if (reviewError) {
		// 	alert.error(reviewError);
		// 	dispatch(clearErrors());
		// }

		// if (success) {
		// 	alert.success("Review Submitted Successfully");
		// 	dispatch({ type: NEW_REVIEW_RESET });
		// }

		dispatch(getProductDetails(id));
	}, [dispatch, id, error, alert]);

	const options = {
		value: 3.5,
		readOnly: true,
		size: "large",
		precision: 0.5,
	};

	const [quantity, setQuantity] = useState(1);
	const [open, setOpen] = useState(false);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const increaseQuantity = () => {
		if (product.stock <= quantity) return;
		const qty = quantity + 1;
		setQuantity(qty);
	};
	const decreaseQuantity = () => {
		if (quantity <= 1) return;
		const qty = quantity - 1;
		setQuantity(qty);
	};

	//add to cart
	const addToCartHandler = () => {
		if (product.stock < 1) {
			alert.error("Item out of stock");
		} else {
			dispatch(addItemsToCart(id, quantity));

			alert.success("Item added to Cart");
		}
	};

	// ADD A REVIEW
	const reviewSubmitHandler = () => {
		const myForm = new FormData();

		myForm.set("rating", rating);
		myForm.set("comment", comment);
		myForm.set("productId", id);

		dispatch(newReview(myForm));

		setOpen(false);
	};

	const submitReviewToggle = () => {
		open ? setOpen(false) : setOpen(true);
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<div className="product-details">
						<div>
							<img className="carousel-image" src={img} alt="img" />
						</div>

						<div>
							<div className="details-block-1">
								<h2>{product.title}</h2>
								<p>Product # {product.id}</p>
							</div>
							<div className="details-block-2">
								<Rating style={{ font: "300 1.5rem 'Roboto'" }} {...options} />
								<span style={{ font: "300 0.8rem 'Roboto'" }}>
									({product.numOfReviews} Reviews)
								</span>
							</div>
							<div className="details-block-3">
								<h1>${product.market_price}</h1>
								<div className="details-block-3-1">
									<div className="details-block-3-1-1">
										<button onClick={decreaseQuantity}>-</button>
										<input readOnly type="number" value={quantity} />
										<button onClick={increaseQuantity}>+</button>
									</div>
									<button onClick={addToCartHandler}>Add to Cart</button>
								</div>

								<p>
									Status: {""}
									<b className={product.stock < 1 ? "redColor" : "greenColor"}>
										{product.quantity < 1 ? "OutOfStock" : "InStock"}
									</b>
								</p>
							</div>

							<button
								className="submit-review-btn"
								onClick={submitReviewToggle}
							>
								Submit Review
							</button>
						</div>
					</div>

					<h3 className="reviews-heading">REVIEWS</h3>

					<Dialog
						aria-labelledby="simple-dialog-title"
						open={open}
						onClose={submitReviewToggle}
					>
						<DialogTitle>Submit Review</DialogTitle>
						<DialogContent className="submitDialog">
							<Rating
								onChange={(e) => setRating(e.target.value)}
								size="large"
								value={rating}
							/>
							<textarea
								rows="5"
								cols="30"
								className="submitDialog-textarea"
								value={comment}
								onChange={(e) => setComment(e.target.value)}
							></textarea>
						</DialogContent>
						<DialogActions>
							<Button onClick={submitReviewToggle} color="secondary">
								Cancel
							</Button>
							<Button color="primary" onClick={reviewSubmitHandler}>
								Submit
							</Button>
						</DialogActions>
					</Dialog>

					{product.reviews && product.reviews[0] ? (
						<div className="reviews">
							{product.reviews &&
								product.reviews.map((review) => <ReviewCard review={review} />)}
						</div>
					) : (
						<p className="no-reviews">No Reviews Yet</p>
					)}
				</>
			)}
		</>
	);
};

export default ProductDetails;
