const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("cart", {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        product_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    });

    //   User.associate = function (models) {
    //     User.hasMany(models.budget);
    //   };

    return Cart;
};