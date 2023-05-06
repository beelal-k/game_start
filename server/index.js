const express = require("express");
const mysql = require("mysql2");
const db = require("./models");
const bodyParser = require('body-parser')
const cors = require('cors');
const jwt = require("jsonwebtoken");
const { sequelize } = require("./models");
let bcrypt = require("bcrypt");

const app = express()
app.use(express.json());
const port = 3000

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

app.post('/login', async (req, res) => {

    console.log("req:", req.body);

    db.user.findOne({
        where: { email: req.body.email }
    }).then((user) => {
        if (user == null) {
            res.send('Email not found');
        }
        else {
            if (bcrypt.compare(req.body.password, user.password, function (err, resp) {
                if (!resp) {
                    res.send("Incorrect Password");
                }

                const token = jwt.sign(user.id, "SECRET_KEY_!@#");

                db.token.create({
                    token: token,
                    user_id: user.id
                });
                res.send({ user, token });
            }));
        }

    }).catch((err) => {
        res.json("Error occured");
    })

app.post("/signup", async (req, res) => {
	console.log(req.body);

})

app.post('/signup', async (req, res) => {

    console.log(req.body)

    db.user.create({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        date_of_birth: req.body.dob,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then((user) => {
        res.send(user);
    }).catch(function (err) {
        res.json(err.errors[0].message);
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

app.get("/verify-user", async (req, res) => {
	// const id = req.params.id;

	db.token
		.findAll({
			limit: 1,
			where: { user_id: 1 },
			order: [["createdAt", "DESC"]],
		})
		.then((token) => {
			// res.send(token[0].token);

			if (
				token[0].token !=
				"eyJhbGciOiJIUzI1NiJ9.MQ.ESunEs6acX2iz7Dq-NSXMrJIsr444yAtSRHJ2v5eeJM"
			) {
				res.send(false);
			}

        res.send(true);
        
    }).catch(function (err) {
        res.json("An error occured");
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

db.sequelize.sync({ force: false }).then(function () {
    app.listen(port, function () {
        console.log("server is successfully running!");
    });
});
