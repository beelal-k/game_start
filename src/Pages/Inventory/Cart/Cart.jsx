import React from "react";
import "./Cart.css";
import CartItemCard from "../CartItemCard/CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import {
	addItemsToCart,
	removeItemsFromCart,
} from "../../../Actions/inventoryActions";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Cart = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { cartItems } = useSelector((state) => state.cart);

	const increaseQuantity = (id, quantity, stock) => {
		const newQty = quantity + 1;
		if (stock <= quantity) {
			return;
		}
		dispatch(addItemsToCart(id, newQty));
	};
	const decreaseQuantity = (id, quantity) => {
		const newQty = quantity - 1;
		if (1 >= quantity) {
			return;
		} else {
			dispatch(addItemsToCart(id, newQty));
		}
	};

	const deleteCartItems = (id) => {
		dispatch(removeItemsFromCart(id));
	};

	// checkout
	const checkoutHandler = () => {
		navigate("/login?redirect=shipping");
	};
	return (
		<>
			<div className="cart-page">
				{cartItems.length === 0 ? (
					<div className="empty-cart">
						<RemoveShoppingCartIcon
							sx={{ width: "4em", height: "4em", color: "tomato" }}
						/>
						<Typography sx={{ marginTop: "10px", fontSize: "1.2em" }}>
							No Product in Your Cart
						</Typography>
						<Button
							to="/"
							component={Link}
							variant="contained"
							color="inherit"
							size="medium"
							sx={{ marginTop: "10px", marginBottom: "10px" }}
						>
							View Products
						</Button>
					</div>
				) : (
					<>
						<div className="cart-header">
							<p>Product</p>
							<p>Qunatity</p>
							<p>Subtotal</p>
						</div>

						{cartItems
							? cartItems.map((item, i) => (
									<div className="cart-container" key={i}>
										<CartItemCard
											item={item}
											deleteCartItems={deleteCartItems(item.id)}
										/>
										<div className="cart-input">
											<button
												onClick={() =>
													decreaseQuantity(item.product, item.quantity)
												}
											>
												-
											</button>
											<input type="number" readOnly value={item.quantity} />
											<button
												onClick={() =>
													increaseQuantity(
														item.product,
														item.quantity,
														item.stock
													)
												}
											>
												+
											</button>
										</div>
										<p className="cart-subtotal">{`$${
											item.price * item.quantity
										}`}</p>
									</div>
							  ))
							: "An error occured"}

						<div className="cart-gross-profit">
							<div></div>
							<div className="cart-gross-profit-box">
								<p>Gross Total</p>
								<p>{`$${cartItems.reduce(
									(acc, item) => acc + item.quantity * item.price,
									0
								)}`}</p>
							</div>
							<div></div>
							<div className="checkout-button ">
								<button onClick={checkoutHandler}>Check Out</button>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default Cart;
