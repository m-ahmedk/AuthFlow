/**
 * Contains functions related to user signup and login. It also imports the signupValidation middleware which contains 
 * validation rules for user signup. It creates a route to access the functions and exports the route to the main router.
 */

const express = require('express')
const userController = require('../controller/auth')
const { signup, login } = userController
const { signupValidation } = require('../middleware/validation/signup-verification')

const userRoute = express.Router()

userRoute.post('/signup', signupValidation, signup)
userRoute.post('/login', login)

module.exports = userRoute