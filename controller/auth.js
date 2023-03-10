const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require('dotenv').config()
const { BadRequestError, GenericError, UnauthorizedError } = require('../errors/index')
const { StatusCodes } = require("http-status-codes")
var fs = require('fs');
const path = require('path');
const { User, Verification } = require('../models/index')
const verificationModel = require('../models/custom/verification-api-model')
const sendEmail = require('../models/mailgun')
const generateRandomString = require('../utils/randomstring')

const send_otp = async (req, res) => {
    try {
        const { email } = req.body
        const code = await generateRandomString(6)

        // mailgun process
        var emailBody = fs.readFileSync(path.join(__dirname, '../public/html/otp-mail.html')).toString();
        emailBody = emailBody.replace('{pincode}', code);
        const ack = await sendEmail(email, `You have received a new OTP`, emailBody);

        let message = ''

        if (ack.status === 200) {
            await Verification.upsert({ email: email, otp: code, verified: 0 })
            message = `OTP (${code}) has been sent to ${email}, OTP mentioned for purpose of ease.`
        }
        else {
            message = `Issues using mailgun: ${ack}`
        }

        const response = new verificationModel(false, false, message);
        res.status(StatusCodes.OK).json(response)
    }
    catch (error) {
        throw new GenericError(error, error.statusCode)
    }
}

const verify_otp = async (req, res) => {
    try {
        const { email, otp } = req.body
        const _verification = await Verification.findOne({
            where: {
                email: email,
            }
        });

        let message = ''
        let verified = false
        if (otp === _verification.otp) {
            verified = true
            message = 'OTP has been verified. Proceed to register/signup screen.'

            _verification.verified = verified; // set verified field to true
            await _verification.save(); // persist changes in the database
        }
        else {
            message = 'OTP did not match. Enter the correct OTP to continue.'
        }

        const response = new verificationModel(verified, false, message)
        res.status(StatusCodes.OK).json(response)
    }
    catch (error) {

    }
}

// signing a user up
// hashing users password before it is saved to the database with bcrypt
const signup = async (req, res) => {
    try {
        const { username, name, email, phonenumber, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        const data = {
            username, name, email, phonenumber, password: hashedPassword,
        };

        // saving the user and updating userId in Verification table
        const user = await User.create(data);
        await Verification.update({ userId: user.userId },
            {
                where: { email: email }
            }
        )

        // if user details is captured
        // generate token with the user's id and the secretKey in the env file
        if (user) {
            let token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            return res.setHeader('Authorization', 'Bearer ' + token).status(StatusCodes.CREATED).send(user);
        } else {
            throw new BadRequestError('Details are not correct');
        }
    } catch (error) {
        throw new GenericError(error, error.statusCode)
    }
};


// login authentication
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // find a user by their email
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        // if user email is found, compare password with bcrypt
        if (user) {
            const matched = await bcrypt.compare(password, user.password);

            // if password is the same
            // generate token with the user's id and the secretKey in the env file

            if (matched) {
                let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });

                // send user data
                return res.setHeader('Authorization', 'Bearer ' + token).status(StatusCodes.OK).send(user);

            } 
            else {
                throw new UnauthorizedError('Incorrect Password')
            }
        } 
        else {
            throw new UnauthorizedError(`Authentication failed. User doesn't exist.`)
        }
    } catch (error) {
        throw new GenericError(error, error.statusCode)
    }
};

module.exports = {
    send_otp,
    verify_otp,
    signup,
    login,
};