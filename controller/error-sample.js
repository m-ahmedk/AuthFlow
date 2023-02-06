/**
 * Sample response of each custom errors
 */

const { BadRequestError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError } = require('../errors/index')

const badrequest = () => {
    const message = `Missing required parameters, invalid data types, or incorrect syntax in the request.`
    throw new BadRequestError(message)
}

const forbidden = () => {
    const message = `You are not authorized to access the requested resource`
    throw new ForbiddenError(message)
}

const internalserver = () => {
    const message = `An internal server error occurred.. Please contact the server administrator`
}

const notfound = () => {
    const message = `Unable to locate the requested resource, either because it doesn't exist, or because the URL that the client used is incorrect`
    throw new NotFoundError(message)
}

const unauthorized = () => {
    const message = `Please provide a valid username and password or other form of authentication to access the requested resource.`
    throw new UnauthorizedError(message)
}


module.exports = { badrequest, forbidden, internalserver, notfound, unauthorized }