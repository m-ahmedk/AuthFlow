/**
 * The function maps different routes to the corresponding route modules using the "app.use" method. 
 * This code provides a clear and organized way to set up all the routes in the application and helps to 
 * maintain the structure and modularity of the application. 
 */

const errorSampleRoute = require('./error-sample')

module.exports = function(app) {
    app.use('/api/v1/errormanagement', errorSampleRoute)
}