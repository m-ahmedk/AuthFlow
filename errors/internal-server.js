/**
 * Extend the built-in "Error" class to have a custom error message and internal server error status code 
 */

const { StatusCodes } = require('http-status-codes')

class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.InternalServerError
    }
}

module.exports = InternalServerError