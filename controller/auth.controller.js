const { responseCodesEnum: { CONFLICT } } = require('../constants');
const { OAuthModel } = require('../dataBase');
const { ErrorHandler, errorMessages: { WRONG_LOGIN_PASSWORD } } = require('../errors');
const { passwordHasher } = require('../helpers');
const { authServices } = require('../services');

module.exports = {
    login: async (req, res, next) => {
        try {
            if (!req.user) {
                throw new ErrorHandler(CONFLICT, WRONG_LOGIN_PASSWORD.message, WRONG_LOGIN_PASSWORD.customCode);
            }

            const { password: hashedPassword, _id } = req.user;
            const { password } = req.body;

            await passwordHasher.compare(password, hashedPassword);

            const tokenPair = authServices.generateTokens();

            await OAuthModel.create({ ...tokenPair, user: _id });

            res.json({ ...tokenPair, user: req.user });
        } catch (e) {
            next(e);
        }
    },

    logout: (req, res, next) => {
        try {
            res.json(req.user);

            next();
        } catch (e) {
            next(e);
        }
    }
};
