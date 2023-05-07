import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	AppBar,
	Typography,
	Toolbar,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoginIcon from "@mui/icons-material/Login";
import logo from "../../assets/logo.svg";
import "./Header.css";
// import { useSelector } from "react-redux";

////

function Header() {
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<>
			<AppBar className="appbar">
				<Toolbar>
					<Typography
						sx={
							isMatch
								? { margin: "auto", color: "white !important" }
								: { marginRight: "auto", color: "white !important" }
						}
					></Typography>
					<h3 id="heading-header">GameStart</h3>
					<section className="icons-section">
						<Link to="/cart">
							<ShoppingCartIcon
								className="cart-btn"
								sx={{ marginRight: "2vw", color: "white !important" }}
							/>
						</Link>
						<Link to="/login">
							<FavoriteIcon
								sx={{ marginRight: "2vw", color: "white !important" }}
								className="login-btn"
							/>
						</Link>
						<Link to="/login">
							<LoginIcon
								sx={{ marginRight: "2vw", color: "white !important" }}
								className="login-btn"
							/>
						</Link>
					</section>
				</Toolbar>
			</AppBar>
		</>
	);
}

export default Header;
