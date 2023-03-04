/**
 * If the error object "err" has its own message and status code properties, these are used instead. 
 * The function then sets the HTTP response status to the custom error status code and returns a JSON object 
 * with the custom error message. It also logs the error in the log file.
 * 
 * This error handling function is meant to be a central point for handling errors in the application and 
 * ensuring a consistent response format for errors. 
 */

const { StatusCodes } = require('http-status-codes')
const { dashLogger } = require('../logger/logger')

const errorHandler = (err, req, res, next) => {
    const message = "An error occurred.. Please try again later."

    console.log(err.message)
    const customError = {
        message: err.message || message,
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    }

    console.log(err)

    if(err.code === '23503') {
        customError.message = 'SequelizeForeignKeyConstraintError: insert or update on table';
        customError.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    }

    dashLogger.error(`Error: ${customError.message}`)
    res.status(customError.statusCode).json({"message": customError.message})
}

module.exports = errorHandler