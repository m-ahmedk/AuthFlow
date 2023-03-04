/**
 * Extend the built-in "Error" class to have a custom error message 
 */

class GenericError extends Error {
    constructor(message, statusCode) {
        if (message.name && message.name === 'SequelizeForeignKeyConstraintError') {
            message = message.name + ': ' + message.parent.detail

            super(message)
            this.statusCode = statusCode
        }
        else {
            super(message)
            this.statusCode = statusCode
        }
    }
}

module.exports = GenericError