const Joi = require('joi');

const { regexp: { LOGIN_REGEXP, PASSWORD_REGEXP } } = require('../constants');

module.exports = {
    checkUserBody: Joi.object().keys({
        name: Joi.string().required().min(3).max(50),
        login: Joi.string().regex(LOGIN_REGEXP).required(),
        password: Joi.string().regex(PASSWORD_REGEXP).required(),
        age: Joi.number().min(1).max(120)
    })
};