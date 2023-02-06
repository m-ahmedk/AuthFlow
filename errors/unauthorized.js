/**
 * Extend the built-in "Error" class to have a custom error message and unauthorized status code 
 */

const { StatusCodes } = require('http-status-codes')

class UnauthorizedError extends Error {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthorizedError