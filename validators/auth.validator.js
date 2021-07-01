const Joi = require('joi');

const { regexp: { LOGIN_REGEXP } } = require('../constants');

module.exports = {
    createUser: Joi.object().keys({
        name: Joi.string().required().min(3).max(50),
        login: Joi.string().regex(LOGIN_REGEXP),
        password: Joi.string().min(8).max(256).required(),
        age: Joi.number().min(1).max(120)
    })
};
