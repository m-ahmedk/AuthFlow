/**
 * Extend the built-in "Error" class to have a custom error message and forbidden status code 
 */

const { StatusCodes } = require('http-status-codes')

class ForbiddenError extends Error {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.FORBIDDEN
    }
}

module.exports = ForbiddenError