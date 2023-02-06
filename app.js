const express = require('express')
require('express-async-errors')

// environment variables
require('dotenv').config()

// import custom middlewares
const errorHandler = require('./middleware/error-handler')
const pageNotFound = require('./middleware/not-found-handler')

// Swagger imports
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDoc = YAML.load('./swagger.yaml')

const app = express();

// express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// route
require('./routes/main')(app)

// default route
app.get('/', (req, res) => {
    res.redirect('/api-docs');
})

// configure swagger options, [removing schema]
var options = {
    swaggerOptions: {
        defaultModelsExpandDepth: -1
    }
};

// api docs route to Swagger docs
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc, options));

// error handler
app.use(errorHandler);
app.use(pageNotFound);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Listening on port: ${port}`)
        })
    }
    catch (error) {
        throw new InternalServerError(`An error ocurred while connecting to database.. ${error}`)
    }
}

start();