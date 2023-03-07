/**
 * Contains functions related to user signup and login. It also imports the signupValidation middleware which contains 
 * validation rules for user signup. It creates a route to access the functions and exports the route to the main router.
 */

const express = require('express')
const userController = require('../controller/auth')
const { send_otp, verify_otp, signup, login } = userController
const { verification } = require('../middleware/validation/pre-verification')
const { signupValidation } = require('../middleware/validation/signup-verification')
const { check_expiration } = require('../middleware/validation/otp-verification')

const userRoute = express.Router()

userRoute.post('/sendotp', verification, send_otp)
userRoute.post('/verifyotp', check_expiration, verify_otp)

userRoute.post('/signup', signupValidation, signup)
userRoute.post('/login', login)

module.exports = userRoute