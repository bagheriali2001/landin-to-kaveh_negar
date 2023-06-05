"use strict";

const { validate } = require("../utils/Validator");
const { header } = require("express-validator");
const { ClientError } = require('../utils/Client_Error');
const AUTHORIZATION = process.env.AUTHORIZATION;

const Authorization = validate([
    header("Authorization")
        .exists()
        .withMessage(
            new ClientError(
                "Authorization header is required",
                401
            )
        )
        .bail()
        .custom(async function (value) {
            if (value !== AUTHORIZATION) {
                throw new ClientError(
                    "Authorization header is incorrect",
                    402
                );
            } else {
                return true;
            }
        }),
]);

module.exports.Authorization = Authorization;
