const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Token = sequelize.define("token", {
        token: {
            type: Sequelize.STRING,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
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

    return Token;
};