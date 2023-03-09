const { StatusCodes } = require('http-status-codes')
const { GenericError, BadRequestError, ForbiddenError } = require('../../errors/index')
const { Verification } = require('../../models/index')

const check_expiration = async (req, res, next) => {
    try {
        const { email, otp } = req.body

        if (!email || !otp) {
            throw new BadRequestError("Email or OTP is invalid or empty")
        }

        const _verification = await Verification.findOne({
            where: {
                email: email
            }
        });

        const current = new Date();
        const updatedAt = _verification.updatedAt

        const diffInMinutes = Math.floor((current.getTime() - updatedAt.getTime()) / 60000);

        if (diffInMinutes > 5) {
            throw new ForbiddenError("OTP has expired. Request a new OTP to continue.")
        }
        else {
            next()
        }
    }
    catch (error) {
        throw new GenericError(error, error.statusCode)
    }
}

module.exports = { check_expiration }