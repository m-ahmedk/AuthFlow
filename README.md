# Centralized Error Handling Middleware
This project provides a centralized error handling mechanism for a Node/Express application. The error handling is performed using a middleware that receives all errors thrown by the application and returns a custom error message along with a relevant HTTP status code. If any errors go unhandled, a default internal server error (HTTP 500) with a custom message is assigned.

The errors are also logged using Winston logger and stored in a file. The logs are automatically deleted after 3 days. This system helps to provide consistent, structured, and comprehensive error handling and reporting in the application.

Additionally, the project opens a swagger documentation (http://localhost:3000/api-docs) which displays all the available requests, their description, and the methods.
<br /><br />

## Features
- Catch all errors thrown by the application
- Return custom error message along with relevant HTTP status code
- Assign default internal server error (HTTP 500) with custom message if any errors go unhandled
- Log all errors using Winston logger
- Store logs in a file and automatically delete after 3 days
- Consistent, structured, and comprehensive error handling and reporting
<br /><br />

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
<br /><br />

## Prerequisites
- Node.js
- npm
<br /><br />

## Installing
Clone the repository:

```
git clone https://github.com/<your-username>/centralized-error-handling.git
```

Navigate to the cloned repository:

```
cd centralized-error-handling
```

Install dependencies:

```
npm install
```

Run the project:

```
npm start
``` 

Open the Swagger documentation in your browser at http://localhost:3000/api-docs
<br /><br />

## Built With
Node.js
Express
Winston
Swagger
<br /><br />

## Contributing
If you would like to contribute to the project, please reach out to the repository owner.
<br /><br />

## License
This project is licensed under the MIT License - see the [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/m-ahmedk/custom-error-management/blob/main/LICENSE) file for details.