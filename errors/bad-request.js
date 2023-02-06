/**
 * Extend the built-in "Error" class to have a custom error message and bad request status code 
 */

const { StatusCodes } = require('http-status-codes')

class BadRequestError extends Error {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError