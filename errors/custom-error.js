/**
 * Extend the built-in "Error" class to have a custom error message 
 */

class CustomError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = CustomError