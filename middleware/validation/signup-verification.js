/* 
    Check if a username or email already exists in the database before allowing a user to sign up.
*/

const { ConflictError, GenericError } = require('../../errors/index')
const { User } = require('../../models/index')

const signupValidation = async (req, res, next) => {
    try {
        const _username = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (_username) {
            // if username exist in the database respond with a conflict status
            throw new ConflictError("username already taken")
        }

        const _email = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (_email) {
            // if email exist in the database respond with a conflict status
            throw new ConflictError("Authentication failed")
        }

        next();
    } catch (error) {
        throw new GenericError(error, error.statusCode)
    }
};

module.exports = {
    signupValidation,
};