/**
 * Connecting to a PostgreSQL database and set sequelize property to db which is used to define models
 * and interact with database
 */
const { Sequelize, DataTypes } = require('sequelize')
require('dotenv').config()

let uri = process.env.DB_URI
const sequelize = new Sequelize(uri, { dialect: "postgres", logging: false })

// checking if connection is done
sequelize.authenticate().then(() => {
    console.log(`Database connected to server..`)
}).catch((err) => {
    console.log(`An error occured while making a db connection: ${err}`)
})

const db = {}
// db.Sequelize = Sequelize
db.sequelize = sequelize

// exporting the module
module.exports = { db, sequelize, DataTypes }