/**
 * Extend the built-in "Error" class to have a custom error message and not found status code 
 */

const { StatusCodes } = require('http-status-codes')

class NotFoundError extends Error {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundError