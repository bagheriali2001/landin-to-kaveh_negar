const Express_router = require('express').Router();
const { webhook } = require('../controllers/main_controller');
const { body } = require('express-validator');
const { validate } = require('../utils/Validator');
const { Authorization } = require('../middleware/Authorize');
const { ClientError } = require('../utils/Client_Error');

// Webhook
Express_router.get('/webhook', Authorization, validate([
    body('landing_id')
        .trim()
        .exists(
            new ClientError(
                "landing_id is required",
                422
            )
        ).bail()
        .isString().withMessage(
            new ClientError(
                "landing_id must be string",
                422
            )
        ),
    body('lead_capture_slug')
        .trim()
        .exists(
            new ClientError(
                "lead_capture_slug is required",
                422
            )
        ).bail()
        .isString().withMessage(
            new ClientError(
                "lead_capture_slug must be string",
                422
            )
        ),
    body('lead_capture_fields')
        .isArray().withMessage(
            new ClientError(
                "lead_capture_fields must be array",
                422
            )
        ),
    body('lead_capture_fields.*.key')
        .trim()
        .exists(
            new ClientError(
                "lead_capture_fields.*.key is required",
                422
            )
        ).bail()
        .isString().withMessage(
            new ClientError(
                "lead_capture_fields.*.key must be string",
                422
            )
        ),
    body('lead_capture_fields.*.value')
        .trim()
        .exists(
            new ClientError(
                "lead_capture_fields.*.value is required",
                422
            )
        ).bail()
        .isString().withMessage(
            new ClientError(
                "lead_capture_fields.*.value must be string",
                422
            )
        ),
    body('lead_capture_fields.*.type')
        .trim()
        .exists(
            new ClientError(
                "lead_capture_fields.*.type is required",
                422
            )
        ).bail()
        .isString().withMessage(
            new ClientError(
                "lead_capture_fields.*.type must be string",
                422
            )
        ),
    body('utm_params')
        .isObject().withMessage(
            new ClientError(
                "utm_params must be object",
                422
            )
        ),
    body('utm_params.source')
        .trim()
        .exists(
            new ClientError(
                "utm_params.source is required",
                422
            )
        ).bail()
        .isString().withMessage(
            new ClientError(
                "utm_params.source must be string",
                422
            )
        ),
    body('utm_params.medium')
        .trim()
        .exists(
            new ClientError(
                "utm_params.medium is required",
                422
            )
        ).bail()
        .isString().withMessage(
            new ClientError(
                "utm_params.medium must be string",
                422
            )
        ),
    body('utm_params.campaign')
        .trim()
        .exists(
            new ClientError(
                "utm_params.campaign is required",
                422
            )
        ).bail()
        .isString().withMessage(
            new ClientError(
                "utm_params.campaign must be string",
                422
            )
        ),
    body('utm_params.content')
        .trim()
        .exists(
            new ClientError(
                "utm_params.content is required",
                422
            )
        ).bail()
        .isString().withMessage(
            new ClientError(
                "utm_params.content must be string",
                422
            )
        ),
    body('utm_params.term')
        .trim()
        .exists(
            new ClientError(
                "utm_params.term is required",
                422
            )
        ).bail()
        .isString().withMessage(
            new ClientError(
                "utm_params.term must be string",
                422
            )
        ),
]), webhook);

module.exports = Express_router;