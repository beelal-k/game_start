const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const GamingGear = sequelize.define("gamingGear", {
        inventory_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        brand: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        color: {
            type: Sequelize.STRING,
            allowNull: false,
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

    return GamingGear;
};