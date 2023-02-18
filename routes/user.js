// importing modules
const express = require('express')
const userController = require('../controller/auth')
const { signup, login } = userController
const { signupValidation } = require('../middleware/validation/user-handler')

const userRoute = express.Router()

// signup endpoint
// passing the middleware function to the signup
userRoute.post('/signup', signupValidation, signup)

// login route
userRoute.post('/login', login)

module.exports = userRoute