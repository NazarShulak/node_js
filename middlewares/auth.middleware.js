const { passwordHasher } = require('../helpers');
const { ErrorHandler, errorMessages: { RECORD_NOT_FOUND, WRONG_LOGIN_PASSWORD } } = require('../errors');
const { responseCodesEnum: { BAD_REQUEST } } = require('../constants');
const { UserModel } = require('../dataBase');

module.exports = {
    checkIfUserExist: async (req, res, next) => {
        try {
            const { login } = req.body;
            const user = await UserModel.findOne({ login }).select('+password');

            if (!user) {
                throw new ErrorHandler(BAD_REQUEST, RECORD_NOT_FOUND.message, RECORD_NOT_FOUND.customCode);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkIfPasswordValid: async (req, res, next) => {
        try {
            const { password } = req.body;

            const validPassword = await passwordHasher.compare(password, req.user.password);

            if (!validPassword) {
                throw new ErrorHandler(WRONG_LOGIN_PASSWORD.message, WRONG_LOGIN_PASSWORD.customCode);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
