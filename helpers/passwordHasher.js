const bcrypt = require('bcrypt');

const { responseCodesEnum: { BAD_REQUEST } } = require('../constants');
const { ErrorHandler, errorMessages: { WRONG_LOGIN_PASSWORD } } = require('../errors');

module.exports = {
    compare: async (password, hashedPassword) => {
        const ifPasswordMatch = await bcrypt.compare(password, hashedPassword);

        if (!ifPasswordMatch) {
            throw new ErrorHandler(BAD_REQUEST, WRONG_LOGIN_PASSWORD.message, WRONG_LOGIN_PASSWORD.customCode);
        }
    },

    hash: (password) => bcrypt.hash(password, 10)
};
