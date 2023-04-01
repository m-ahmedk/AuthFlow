# AuthFlow - Node.js Auth System with OTP + Postgres / Sequelize
This is a _Node.js_ application that provides a secure and user-friendly system for user authentication and authorization, including login, registration, and OTP verification. It uses _JWT_ for authentication and _mailgun.js_ for sending OTP emails. It also includes a centralized error management system with _Winston_ logger to record errors. The database used is _Postgres_ and the ORM used is _Sequelize_.

Additionally, the project opens a _Swagger_ documentation (http://localhost:3000/api-docs) which displays all the available requests, their description, and the methods.

## Prerequisites
- Node.js
- npm

## Getting Started
To get started, clone this repository and install the required dependencies using npm:

```
git clone https://github.com/m-ahmedk/AuthFlow.git
```

Navigate to the cloned repository:

```
cd authflow
```

Install dependencies:

```
npm install
```

Run the project:

```
npm run live
``` 

Open the Swagger documentation in your browser at http://localhost:3000/api-docs

## Built With
Node.js
Express
Sequelize
Mailgun.js
BcryptJs
Winston
Swagger
Yamljs

## Contributing
If you would like to contribute to the project, please reach out to me at m.ahmedk287@gmail.com

## License
This project is licensed under the MIT License - see the [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/m-ahmedk/AuthFlow/blob/main/LICENSE) file for details.
