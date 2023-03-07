const { StatusCodes } = require('http-status-codes')
const { GenericError, BadRequestError } = require('../../errors/index')
const { User, Verification } = require('../../models/index')

// use verification-api-model
const otp_pre_verification = async (req, res, next) => {
    try {
        let { email } = req.body

        if (!email || !email.trim()) {
            throw new BadRequestError("Email is invalid or empty")
        }

        let hasVerified = await verified(email)

        if ( !hasVerified ) {
            // next handler
            next()
        }
        else {
            // is verified, check if registered
            let hasRegistered = await registered(email)

            if ( !hasRegistered ) {
                res.status(StatusCodes.OK).json(`User is verified. Redirect to register screen.`)
            }

            res.status(StatusCodes.OK).json(`User with email '${email}' is already registered`)
        }
    }
    catch (error) {
        throw new GenericError(error, error.statusCode)
    }
}

// check if verified
const verified = async (email) => {
    const verification = await Verification.findOne({
        where: {
            email: email
        }
    });

    if (verification) {
        if (verification.verified != true) {
            return false
        }
        else {
            return true
        }
    }

    return false
}

// check if user registered
const registered = async (email) => {
    const user = await User.findOne({
        where: {
            email: email
        }
    });

    if (user) {
        return true
    }

    return false
}

module.exports = { otp_pre_verification }