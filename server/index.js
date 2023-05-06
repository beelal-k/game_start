const express = require('express')
const mysql = require('mysql2')
const db = require("./models");
const jwt = require("jsonwebtoken");
const { sequelize } = require('./models');
let bcrypt = require("bcrypt");
const { JSON } = require('sequelize')

const app = express()
app.use(express.json());
const port = 3000

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'game_start'
})


sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.get('/users', async (req, res) => {
    db.user.findAll()
        .then((users) => {
            res.send(users);
        })
});

app.post('/login', async (req, res) => {

    console.log("req:", req.body);

    db.user.findOne({
        where: { email: "bilal@gmail.com" }
    }).then((user) => {
        if (user == null) {
            res.send('Email not found');
        }
        else {
            if (bcrypt.compare("123", user.password, function (err, resp) {
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


})

app.post('/signup', async (req, res) => {

    db.user.create({
        name: "Bilal",
        email: "bilal@gmail.com",
        gender: "male",
        date_of_birth: "2002-9-16",
        password: bcrypt.hashSync("123", 8)
    }).then((user) => {
        res.send(user);
    }).catch(function (err) {
        res.json(err.errors[0].message);
    });


})



app.get('/', (req, res) => {
    res.send('Hello Worlds!')
    // console.log(db);
})

db.sequelize.sync({ force: false }).then(function () {
    app.listen(port, function () {
        console.log("server is successfully running!");
    });
});