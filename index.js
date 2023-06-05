const environments = require("dotenv").config(
    {
        path: `config/.env`
    }
);

if (environments.error) {
    throw environments.error;
}

const dotenvExpand = require("dotenv-expand");
dotenvExpand.expand(environments);

const express = require('express');
const helmet = require('helmet');
const Main_router = require('./Routers/Main_Router');
const Error_handler = require('./middleware/Error_Handler');

const Application = express();
const Port = process.env.PORT;

Application.use(express.json()); // setup body parser for handle BODY data and application/json data
Application.use(express.urlencoded({ extended: false }));
Application.use(helmet.hidePoweredBy());
Application.use('/', Main_router);

Application.use(Error_handler); // setup error handler middleware

Application.listen(Port, () => {
    console.log(`API Running @ port ${Port}...`);
});
