const { StatusCodes } = require('http-status-codes')
const { GenericError, BadRequestError } = require('../../errors/index')
const verificationModel = require('../../models/custom/verification-api-model')
const { User, Verification } = require('../../models/index')

// use verification-api-model
const verification = async (req, res, next) => {
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
            let message = ''
            let isVerified = true;
            let isRegistered = false;

            // is verified, check if registered
            let hasRegistered = await registered(email)

            if ( !hasRegistered ) {
                message = 'User is verified. Redirect to register screen.'                 
            }
            else {
                isRegistered = true
                message = `User with email '${email}' is already registered`
            }

            const response = new verificationModel(isVerified, isRegistered, message)
            res.status(StatusCodes.OK).json(response)
        }
    }
    catch (error) {
        throw new GenericError(error, error.statusCode)
    }
}

// check if verified
const verified = async (email) => {
    const _verification = await Verification.findOne({
        where: {
            email: email
        }
    });

    if (_verification) {
        if (_verification.verified != true) {
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

module.exports = { verification }