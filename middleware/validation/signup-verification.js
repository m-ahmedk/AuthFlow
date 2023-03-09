/* 
    Check if a username or email already exists in the database before allowing a user to sign up.
*/

const { ConflictError, GenericError, BadRequestError } = require('../../errors/index')
const { User } = require('../../models/index')
const isEmpty = require('../../utils/required-fields')

const signupValidation = async (req, res, next) => {
    try {

        const { username, name, email, phonenumber, password } = req.body

        const empty = await isEmpty( {username, name, email, phonenumber, password} )
        if(empty) {
            throw new BadRequestError('One or more fields missing')
        }

        const _username = await User.findOne({
            where: {
                username: username,
            },
        });

        if (_username) {
            // if username exist in the database respond with a conflict status
            throw new ConflictError("username already exists")
        }

        const _email = await User.findOne({
            where: {
                email: email,
            },
        });

        if (_email) {
            // if email exist in the database respond with a conflict status
            throw new ConflictError("email already exists")
        }

        next();
    } catch (error) {
        throw new GenericError(error, error.statusCode)
    }
};

module.exports = {
    signupValidation,
};