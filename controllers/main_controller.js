const { matchedData } = require("express-validator");
const { resMaker } = require("../utils/Response");
const { sendSMS } = require('../services/kaveh_negar');

const webhook = async function(req, res, next) {
    try {
        let { landing_id, lead_capture_slug, lead_capture_fields, utm_params } = matchedData(req, { locations: ['body'] });

        console.log("landing_id : ", landing_id);
        console.log("lead_capture_slug : ", lead_capture_slug);
        if(landing_id == "xxxxxxxxxxxxxxxxxxxxxx" && lead_capture_slug === "leadcapture") {
            // Test phase :
            return res.status(200).json(resMaker("Webhook test action ran successfully.", false));
        }

        const first_name = lead_capture_fields.find(field => field.key === "نام").value;
        const last_name = lead_capture_fields.find(field => field.key === "نام خانوادگی").value;
        const phone_number = lead_capture_fields.find(field => field.key === "شماره موبایل").value;
        const full_name = `${first_name} ${last_name}`;

        await sendSMS(phone_number, full_name);

        res.status(200).json(resMaker("Webhook action ran successfully.", false));
    }catch(err) {
        next(err);
    }
};

module.exports.webhook = webhook;