const {DataTypes} = require('sequelize')

const {sequelize} = require('../util/database')

module.exports = {
    House : sequelize.define('house', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        address: DataTypes.STRING,
        zipcode: DataTypes.INTEGER,
        price: DataTypes.DECIMAL,
        photo_link: DataTypes.STRING,
        num_bed: DataTypes.INTEGER,
        num_bath: DataTypes.INTEGER
    })
}