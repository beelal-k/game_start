const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        item_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        order_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        order_status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        user_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        payment_id:{
            type: Sequelize.INTEGER,
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

    return Order;
};