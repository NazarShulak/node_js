const Joi = require('joi');
const { regexp: { EMAIL_REGEXP, PASSWORD_REGEXP } } = require('../constants');

module.exports = {
    loginUser: Joi.object().keys({
        login: Joi.string().regex(EMAIL_REGEXP).required(),
        password: Joi.string().regex(PASSWORD_REGEXP).required()
    })
};
