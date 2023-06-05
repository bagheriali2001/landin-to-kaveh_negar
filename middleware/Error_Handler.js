'use strict'
const httpStatus = require('http-status-codes');

const errorHandler = function (error, req, res, next) {
    console.log(error);
    
    if(error.CLIENT_ERROR) {
        let err_response;
        let is_client_error = true;
        if(typeof error.message === 'string' || typeof error.message === String) {
            err_response = { errors: [ { message: error.message } ] };            
        }else {
            if((error.message)[0].msg.CLIENT_ERROR) {
                err_response = { errors: error.message.map(value => { return { message: value.msg.message } }) };
            }else {
                is_client_error = false;
            }
        }
        if(is_client_error) {
            let http_code = error.CODES;
            
            if (!(typeof error.message === 'string' || typeof error.message === String)) {
                http_code = (error.message)[0].msg.CODES;
            }

            res.status(http_code)
                .json({
                    header: {
                        status_code: http_code,
                        status: httpStatus.getStatusText(http_code)
                    },
                    body: err_response
                }
            );
        }else {
            res.status(500)
                .json({
                    header: {
                        status_code: 500,
                        status: httpStatus.getStatusText(500)
                    },
                    body: {
                        errors: [ { message: "Internal Server Error" } ]
                    }
                }
            );
        }                
    } else {
        res.status(500)
            .json({
                header: {
                    status_code: 500,
                    status: httpStatus.getStatusText(500)
                },
                body: {
                    errors: [ { message: "Internal Server Error" } ]
                }
            }
        );
    }
};

module.exports = errorHandler;