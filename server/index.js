const express = require("express");
const mysql = require("mysql2");
const db = require("./models");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { sequelize } = require("./models");
const bcrypt = require("bcrypt");
const multer = require("multer");
const upload = multer({
	dest: "./uploads/",
});
const fs = require("fs");
const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
	})
);

app.use(bodyParser.json());
const port = 3000;

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "game_start",
});

sequelize
	.authenticate()
	.then(() => {
		console.log("Connection has been established successfully.");
	})
	.catch((err) => {
		console.error("Unable to connect to the database:", err);
	});

app.get("/users", async (req, res) => {
	db.user.findAll().then((users) => {
		res.send(users);
	});
});

app.post("/login", async (req, res) => {
	console.log("req:", req.body.email);

	await db.user
		.findOne({
			where: { email: req.body.email },
		})
		.then((user) => {
			if (user == null) {
				res.send("Email not found");
			} else {
				if (
					bcrypt.compare(
						req.body.password,
						user.password,
						async function (err, resp) {
							if (!resp) {
								res.send("Incorrect Password");
							} else {
								const token = jwt.sign(user.id, "SECRET_KEY_!@#");

								await db.token.create({
									token: token,
									user_id: user.id,
								});
								const options = {
									expires: new Date(Date.now() + 864000),
									httpOnly: true,
								};

								res.status(200).cookie("token", token, options).json({
									success: true,
									user,
									token,
								});
								// res.send({ user, token });
							}
						}
					)
				);
			}
		})
		.catch((err) => {
			res.json("An error occured");
		});
});

app.post("/signup", async (req, res) => {
	console.log(req.body);

	await db.user
		.create({
			name: req.body.name,
			email: req.body.email,
			gender: req.body.gender,
			date_of_birth: req.body.dob,
			password: bcrypt.hashSync(req.body.password, 8),
		})
		.then((user) => {
			res.send(user);
		})
		.catch(function (err) {
			res.json("Could not create account");
		});
});

app.post("/create-review", async (req, res) => {
	db.review
		.create({
			product_id: 1,
			user_id: 1,
			rating: 3,
			comment: "Amazing product",
		})
		.then((rev) => {
			res.send(rev);
		})
		.catch(function (err) {
			res.json(err.errors[0].message);
		});
});

app.post("/delete-review", async (req, res) => {
	db.review
		.destroy({ where: { id: 1 } })
		.then((rev) => {
			res.send("Deleted review successfully!");
		})
		.catch(function (err) {
			res.json(err.errors[0].message);
		});
});

app.get("/review/:id", async (req, res) => {
	const id = req.params.id;
	db.review
		.findOne({ where: { id: id } })
		.then((rev) => {
			res.send(rev);
		})
		.catch(function (err) {
			res.json(err.errors[0].message);
		});
});

app.get("/product-reviews/:id", async (req, res) => {
	const id = req.params.id;

	db.review
		.findAll({ where: { product_id: id } })
		.then((rev) => {
			res.send(rev);
		})
		.catch(function (err) {
			res.json(err.errors[0].message);
		});
});

app.post("/verify-user/:id", async (req, res) => {
	const id = req.params.id;

	db.token
		.findAll({
			limit: 1,
			where: { user_id: id },
			order: [["createdAt", "DESC"]],
		})
		.then((token) => {
			// res.send(token[0].token);

			if (token[0].token != req.body.token) {
				res.send(false);
			}

			res.send(true);
		})
		.catch(function (err) {
			res.json("An error occured");
		});
});

app.post("/update-review", async (req, res) => {
	db.review
		.update({ comment: "This is amazing again!" }, { where: { id: 1 } })
		.then((rev) => {
			res.send("Updated review successfully!");
		})
		.catch(function (err) {
			res.json(err.errors[0].message);
		});
});

app.get("/", (req, res) => {
	res.send("Hello Worlds!");
	// console.log(db);
});

let temp;
app.post("/add-to-cart", async (req, res) => {
	await db.cart
		.create({
			quantity: req.body.quantity,
			product_id: req.body.product_id,
			user_id: req.body.user_id,
		})
		.then(async (cart) => {
			await db.order
				.findOne({
					where: { user_id: cart.user_id },
				})
				.then(async (user) => {
					temp = user;
					if (user == null) {
						await db.order
							.create({
								item_id: req.body.product_id,
								order_status: "Pending",
								user_id: req.body.user_id,
								order_date: Date.now(),
							})
							.then((order) => {
								res.send({ cart, order });
							});
					} else {
						let items = user.item_id;
						// items.join("," + req.body.product_id);
						await db.order
							.update(
								{ item_id: items.join(",", req.body.product_id) },
								{ where: { user_id: req.body.user_id } }
							)
							.then((order) => {
								res.send("Order");
							})
							.catch((err) => {
								res.send("Error occured");
							});
					}
				});
			// res.send(cart);
		})
		.catch((err) => {
			res.send("Error");
		});
});

app.post("/confirm-order", async (req, res) => {
	await db.payment
		.create({
			card_number: req.body.card_number,
			card_name: req.body.card_name,
			card_expiry: req.body.card_expiry,
			payment_status: "Paid",
			payment_date: Date.now(),
		})
		.then(async (payment) => {
			await db.order.update(
				{ order_status: "Confirmed" },
				{ where: { user_id: req.body.user_id } }
			);
			res.send(payment);
		})
		.catch((err) => {
			res.send("Could not complete payment");
		});
});

app.post("/create-inventory", upload.single("file"), async (req, res) => {
	let imageData = fs.readFileSync(req.file.path);
	await db.inventory
		.create({
			quantity: req.body.quantity,
			title: req.body.title,
			market_price: req.body.market_price,
			cost_price: req.body.cost_price,
			margin: req.body.market_price - req.body.cost_price,
			inventory_type: req.body.inventory_type,
			minimum_age: req.body.minimum_age,
			product_picture: imageData,
		})
		.then(async (inven) => {
			res.send(inven);
		})
		.catch((err) => {
			res.send("Could not create inventory");
		});
});

app.post("/delete-inventory", async (req, res) => {
	await db.inventory
		.destroy({
			where: { id: req.body.product_id },
		})
		.then(async (inven) => {
			res.send("Successfully deleted inventory");
		})
		.catch((err) => {
			res.send("Could not delete inventory");
		});
});

app.post("/update-inventory", async (req, res) => {
	await db.inventory
		.update(
			{
				quantity: req.body.quantity,
				title: req.body.title,
				market_price: req.body.market_price,
				cost_price: req.body.cost_price,
				margin: req.body.market_price - req.body.cost_price,
				inventory_type: req.body.inventory_type,
				minimum_age: req.body.minimum_age,
			},
			{ where: { id: req.body.product_id } }
		)
		.then(async (inven) => {
			res.send("Successfully updated inventory");
		})
		.catch((err) => {
			res.send("Could not update inventory");
		});
});

app.get("/all-inventory", async (req, res) => {
	await db.inventory
		.findAll()
		.then(async (inven) => {
			res.send(inven);
		})
		.catch((err) => {
			res.send("Could not get inventory");
		});
});

app.get("/inventory/:id", async (req, res) => {
	const id = req.params.id;

	await db.inventory
		.findOne({ where: { id: id } })
		.then(async (inven) => {
			res.send(inven);
		})
		.catch((err) => {
			res.send("Could not get inventory");
		});
});

app.get("/orders", async (req, res) => {
	await db.order
		.findAll()
		.then(async (orders) => {
			res.send(orders);
		})
		.catch((err) => {
			res.send("Could not get all orders");
		});
});

db.sequelize.sync({ force: false }).then(function () {
	app.listen(port, function () {
		console.log("server is successfully running!");
	});
});
