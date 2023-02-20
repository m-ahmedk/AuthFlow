/**
 * Centralized model that imports all the models used in this project, assigning them to db property and exporting it for
 * implementing the business logics
 */
const { db, sequelize, DataTypes } = require("../db/connect")

// defining schemas and model for the collections used in this project, in sequelize.
db.users = require('../models/users')(sequelize, DataTypes)

// assign resulting model(s) above to variable
const User = db.users


module.exports = { User }