import React, { useState, useEffect } from "react";
import {
	TextField,
	InputLabel,
	Select,
	MenuItem,
	FormControl,
	Button,
} from "@mui/material";
import "./CreateInventory.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CREATE_INVENT_RESET } from "../../../Constants/inventoryConstants";
import { useAlert } from "react-alert";
import { createProduct, clearErrors } from "../../../Actions/inventoryActions";

const CreateInventory = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { loading, error, success } = useSelector(
		(state) => state.newInventory
	);

	const [title, setTitle] = useState("");
	const [quantity, setQuantity] = useState("");
	const [market_price, setMarket_price] = useState("");
	const [cost_price, setCost_price] = useState("");
	const [inv_typ, setinv_typ] = useState("");
	const [image, setImage] = useState();
	const [minimumAge, setMinimumAge] = useState("");

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (success) {
			alert.success("Product Created Successfully");
			navigate("/");
			dispatch({ type: CREATE_INVENT_RESET });
		}
	}, [error, success, dispatch, navigate, alert]);

	const createProductSubmitHandler = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("title", title);
		myForm.set("quantity", quantity);
		myForm.set("market_price", market_price);
		myForm.set("cost_price", cost_price);
		myForm.set("inventory_type", inv_typ);
		myForm.set("minimum_age", minimumAge);
		myForm.set("product_picture", image);

		console.log(myForm);

		dispatch(createProduct(myForm));
	};

	const createProductImageChange = (e) => {
		const file = e.target.files;

		setImage("");

		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setImage(reader.result);
			}
		};

		reader.readAsDataURL(file);
	};

	return (
		<>
			<form className="createForm">
				<h1>Create Inventory</h1>

				<input
					type="file"
					name="product_picture"
					onChange={createProductImageChange}
				/>
				<TextField
					id="outlined-basic"
					className="top"
					type="text"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					name="title"
					required
					label="Title"
					variant="outlined"
				/>
				<TextField
					id="outlined-basic"
					className="top"
					type="number"
					placeholder="Quantity"
					value={quantity}
					onChange={(e) => setQuantity(e.target.value)}
					name="quantity"
					required
					label="Quantity"
					variant="outlined"
				/>
				<TextField
					id="outlined-basic"
					className="top"
					type="number"
					placeholder="Market Price"
					value={market_price}
					onChange={(e) => setMarket_price(e.target.value)}
					name="market_price"
					required
					label="Market Price"
					variant="outlined"
				/>
				<TextField
					id="outlined-basic"
					className="top"
					type="number"
					placeholder="Cost Price"
					value={cost_price}
					onChange={(e) => setCost_price(e.target.value)}
					name="cost_price"
					required
					label="Cost Price"
					variant="outlined"
				/>
				<TextField
					id="outlined-basic"
					className="top"
					type="number"
					placeholder="Minimum Age"
					value={minimumAge}
					onChange={(e) => setMinimumAge(e.target.value)}
					name="minimum_age"
					required
					label="Minimum Age"
					variant="outlined"
				/>

				<FormControl fullWidth className="top">
					<InputLabel id="demo-simple-select-label">Inventory Type</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						label="Inventory Type"
						name="inventory_type"
						onChange={(e) => setinv_typ(e.target.value)}
					>
						<MenuItem value="gaming_gear">Gaming Gear</MenuItem>
						<MenuItem value="video_games">Video Games</MenuItem>
					</Select>
				</FormControl>
				<br />
				<Button
					className="createBtn bottom"
					variant="outlined"
					onClick={createProductSubmitHandler}
				>
					Create
				</Button>
			</form>
		</>
	);
};

export default CreateInventory;
