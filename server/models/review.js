const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("review", {
        product_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        user_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        rating:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate:{
                min: 1,
                max: 5,
            }
        },
        comment:{
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    //   User.associate = function (models) {
    //     User.hasMany(models.budget);
    //   };


    return Review;
};