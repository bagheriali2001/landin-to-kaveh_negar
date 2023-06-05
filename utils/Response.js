'use strict'

const resMaker = function(value, isObject=true) {
    const body = isObject ? value : { message: value };
    const response = {
        header: {
            status_code: 200,
            status: 'OK'
        },
        body: body
    };
    return response;
};

module.exports.resMaker = resMaker;