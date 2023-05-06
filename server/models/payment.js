const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payment", {
        card_number: {
            type: Sequelize.STRING,
            allowNull: false
        },
        card_expiry: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        card_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        payment_status:{
            type: Sequelize.STRING,
            allowNull: true
        },
        payment_date:{
            type: Sequelize.DATEONLY,
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

    return Payment;
};