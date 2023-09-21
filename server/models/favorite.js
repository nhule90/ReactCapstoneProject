const {DataTypes} = require('sequelize')

const {sequelize} = require('../util/database')

module.exports = {
    Favorite : sequelize.define('favorite', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        user_id: DataTypes.INTEGER,
        house_id: DataTypes.INTEGER
    })
}