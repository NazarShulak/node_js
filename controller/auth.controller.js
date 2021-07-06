const { constants: { AUTHORIZATION } } = require('../constants');
const { OAuthModel } = require('../dataBase');
const { authServices } = require('../services');
const { responseCodesEnum: { NO_CONTENT }, constants: { USER_LOGOUT } } = require('../constants');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { _id } = req.user;
            const tokenPair = authServices.generateTokens();

            await OAuthModel.create({ ...tokenPair, user: _id });

            res.json({ ...tokenPair, user: req.user });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const { accessToken } = req.user;

            await OAuthModel.remove({ accessToken });

            res.status(NO_CONTENT).json(USER_LOGOUT);
            next();
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const refreshToken = req.get(AUTHORIZATION);
            const { user } = req;
            const tokenPair = authServices.generateTokens();

            await OAuthModel.findOneAndUpdate({ refreshToken }, { ...tokenPair });

            res.json({ ...tokenPair, user });
        } catch (e) {
            next(e);
        }
    }
};
