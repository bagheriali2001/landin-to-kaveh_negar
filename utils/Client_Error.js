'use strict'
const util = require("util");

class ClientError{
    constructor(message, SPEC_CODE = { http: 422, spec: -1 }, replacement_values = []) {
        if (replacement_values.length > 0) {
            this.message = util.format(message, ...replacement_values).toString();
        }else {
            this.message = message;
        }
        this.CODES = SPEC_CODE;
        this.CLIENT_ERROR = true;
    }
}

module.exports.ClientError = ClientError;