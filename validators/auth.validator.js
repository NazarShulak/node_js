const Joi = require('joi');
const { regexp: { LOGIN_REGEXP, PASSWORD_REGEXP } } = require('../constants');

module.exports = {
    logInUser: Joi.object().keys({
        login: Joi.string().regex(LOGIN_REGEXP).required(),
        password: Joi.string().regex(PASSWORD_REGEXP).required()
    })
};
