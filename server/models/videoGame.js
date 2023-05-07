const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const VideoGame = sequelize.define("videoGame", {
        inventory_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        developer: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        platform: {
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

    return VideoGame;
};