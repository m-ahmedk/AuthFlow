const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require('dotenv').config()
const { BadRequestError, GenericError, UnauthorizedError  } = require('../errors/index')
const { StatusCodes } = require("http-status-codes")
const { User } = require('../models/index')

// signing a user up
// hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(password, salt);

        const data = {
            username,
            email,
            password: hashedPassword,
        };

        // saving the user
        const user = await User.create(data);

        // if user details is captured
        // generate token with the user's id and the secretKey in the env file
        // set cookie with the token generated
        if (user) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);

            // send users details
            return res.status(StatusCodes.CREATED).send(user);
        } else {
            throw new BadRequestError('Details are not correct')
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

                // generate cookie, not done due to security issues
                // res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                // console.log("user", JSON.stringify(user, null, 2));

                // send user data
                return res.status(StatusCodes.OK).send(user);
            } else {
                throw new UnauthorizedError('Authentication failed')
            }
        } else {
            throw new UnauthorizedError('Authentication failed')
        }
    } catch (error) {
        throw new GenericError(error, error.statusCode)
    }
};

module.exports = {
    signup,
    login,
};