/**
 * Router that maps specific route URLs to error handling functions. 
 * When the routes "/badrequest", "/notfound", and "/unauthorized" are accessed, 
 * the corresponding error handling functions will be executed. 
 * 
 * This code sets up a modular structure for handling different types of errors in the 
 * application and allows for a clear separation of responsibilities between the error 
 * handling functions and the Express.js router.
 */

const express = require('express')
const { badrequest, forbidden, internalserver, notfound, unauthorized } = require('../controller/error-sample')

const errorSampleRoute = express.Router()

errorSampleRoute.route('/badrequest').get(badrequest)
errorSampleRoute.route('/forbidden').get(forbidden)
errorSampleRoute.route('/internalserver').get(internalserver)
errorSampleRoute.route('/notfound').get(notfound)
errorSampleRoute.route('/unauthorized').get(unauthorized)

module.exports = errorSampleRoute