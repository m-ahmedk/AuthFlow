/**
 * Defining verification model mapping with the postgres using sequelize library and DataTypes 
 */

const { sequelize, DataTypes } = require("../db/connect")

const Verification = sequelize.define('Verification', {
    verificationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        isEmail: true,
        unique: true,
        allowNull: false
    },
    otp: {
        type: DataTypes.STRING
    },
    verified: {
        type: DataTypes.BOOLEAN
    },
},
{ timestamps: true },);

module.exports = Verification;