const { db, sequelize, DataTypes } = require("../db/connect")

// defining schemas and model for the collections used in this project, in sequelize.
db.users = require('../models/users')(sequelize, DataTypes)

// assign resulting model(s) above to variable
const User = db.users


module.exports = { User }