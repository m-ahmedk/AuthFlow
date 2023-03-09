/**
 * Extend the built-in "Error" class to have a custom error message 
 */

class GenericError extends Error {
    constructor(message, statusCode) {

        const sequelizeErrors = ["SequelizeUniqueConstraintError", "SequelizeForeignKeyConstraintError"];

        if (message.name && sequelizeErrors.includes(message.name)) {
            message = message.name + ': ' + message.parent.detail
        }

        super(message)
        this.statusCode = statusCode

    }
}

module.exports = GenericError