/**
 * Defining user model mapping with the postgres using sequelize library and DataTypes
 */

const { sequelize, DataTypes } = require("../db/connect")

const User = sequelize.define("User", {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        isEmail: true,
        unique: true,
        allowNull: false
    },
    phonenumber: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
{ timestamps: true },
)

module.exports = User