const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = 3000
const db = require("./models");
const { User } = require('./models/user');
const { sequelize } = require('./models');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'game_start'
})

app.use(express.json());
let bcrypt = require("bcrypt");
const { JSON } = require('sequelize')

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

    // db.user.create({
    //     name: "Muneeb",
    //     email: "muneeb@gmail.com",
    //     password: bcrypt.hashSync("123", 8)
    // }).then(function (item) {
    //     res.json({
    //         "Message": "Created user!",
    //         "Item": item
    //     });
    // }).catch(function (err) {
    //     // handle error;
    //     res.json(err.errors[0].message);
    // });


});

app.get('/login', async (req, res) => {
    // db.sequelize.sync().then(function () {
    // console.log("req:", req.body);
    db.user.findOne({
        where: { email: "muneeb@gmail.com" }
    }).then((user) => {
        if (user == null) {
            res.send('Email not found');
        }
        res.send(user);

    })


})

app.post('/signup', async (req, res) => {
    // db.sequelize.sync().then(function () {
    // console.log("req:", req.body);
    db.user.create({
        name: "Bilal",
        email: "bilal@gmail.com",
        gender: "Male",
        date_of_birth: "2002-9-16",
        password: bcrypt.hashSync("123", 8)
    }).then((user) => {
        res.send(user);
    })


})


app.get('/', (req, res) => {
    res.send('Hello Worlds!')
    console.log(db);
})

db.sequelize.sync({ force: false }).then(function () {
    app.listen(port, function () {
        console.log("server is successfully running!");
    });
});