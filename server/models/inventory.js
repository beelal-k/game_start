const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Inventory = sequelize.define("inventory", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        market_price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        cost_price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        margin:{
            type: Sequelize.INTEGER,
            allowNull: true
        },
        inventory_type:{
            type: Sequelize.STRING,
            allowNull: false
        },
        minimum_age:{
            type: Sequelize.INTEGER,
            allowNull: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        product_picture:{
            type: Sequelize.BLOB,
            allowNull: false
        }
    });

    //   User.associate = function (models) {
    //     User.hasMany(models.budget);
    //   };

    // User.create({
    //     name: "Bilal",
    //     email: "bilal@gmail.com",
    //     password: "123"
    // });

    return Inventory;
};