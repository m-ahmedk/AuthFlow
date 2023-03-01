/**
 * Centralized model that imports all the models used in this project, assigning them to db property and exporting it for
 * implementing the business logics
 */
const { db } = require("../db/connect")

// defining schema(s) and model(s) for the collections used in this project, in sequelize
db.users = require('./users')
db.verification = require('./verification')

require('./associations');

// assign resulting model(s) above to variable
const User = db.users
const Verification = db.verification


module.exports = { User, Verification }