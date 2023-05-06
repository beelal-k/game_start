const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = 3000
const db = require("./models");
// const User = require('./models/user');
const { User } = require('./models/user');
const { sequelize } = require('./models');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'game_start'
})

try {
    connection.connect()
}
catch (error) {
    console.log(error);
}


sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.get('/users', async (req, res) => {
    // const users = await ;
    // const User = require(`${__dirname}/models/user`)(sequelize)
    // User.findAll().then(users =>{
    //     console.log(users);
    //     db.sequelize.close();
    // })  
    // db.User.findAll({
    //     include: [db.User]
    // }).then(function (users) {
    //     res.render('index', {
    //         title: 'Sequelize: Express Example',
    //         users: users
    //     });
    // });
    db.sequelize.sync().then(function () {
        db.user.create({
            name: "Waleed",
            email: "waleed@gmail.com",
            password: "123"
        });
        // console.log(users);
    });
    // console.log(users);
    // User.create({
    //     name: "Bilal",
    //     email: "bilal@gmail.com",
    //     password:"123"
    // });
    // console.log(User);
    // res.json(users);
});


// if(connection.connect()){
//     console.log('Connected to database successfully!');
// }
// else{
//     console.log('An error occurred while connecting to database!');

// }

app.get('/', (req, res) => {
    res.send('Hello Worlds!')
    console.log(db);
})

db.sequelize.sync({ force: false }).then(function () {
    app.listen(port, function () {
        console.log("server is successfully running!");
    });
});