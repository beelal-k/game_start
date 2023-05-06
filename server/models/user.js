const Sequelize = require('sequelize');
// const {sequelize, Sequelize} = require('../models/index.js');


module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true,
            },
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    //   User.associate = function (models) {
    //     User.hasMany(models.budget);
    //   };

    return User;
};