const { ClientError } = require('./Client_Error');
const { validationResult } = require('express-validator');
 
const validate = validations => {
    return async (req, res, next) => {
      await Promise.all(validations.map(validation => validation.run(req)));
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
  
      next(new ClientError(errors.array()));
    };
};

module.exports.validate = validate;