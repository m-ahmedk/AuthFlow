const express = require('express')
require('dotenv').config()
require('express-async-errors')
const errorHandler = require('./middleware/error-handler')
const pageNotFound = require('./middleware/not-found-handler')
const db = require('./db/connect')
const cookieParser = require('cookie-parser')

// Swagger imports
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDoc = YAML.load('./swagger.yaml')

const app = express();

// express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// sync database to false to avoid data loss
db.sequelize.sync({ force: false })

// main route
require('./routes/main')(app)

// default route to /api-docs
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
app.use(pageNotFound);
app.use(errorHandler);

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
