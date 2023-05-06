const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Query = sequelize.define("query", {
        product_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        user_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        query_title:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        query_body:{
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    //   User.associate = function (models) {
    //     User.hasMany(models.budget);
    //   };
    
    return Query;
};