const { OAuthModel } = require('../dataBase');
const { authServices } = require('../services');
const { responseCodesEnum: { DELETED }, constants: { USER_LOGOUT } } = require('../constants');

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

            res.status(DELETED).json(USER_LOGOUT);
            next();
        } catch (e) {
            next(e);
        }
    },

    refresh: (req, res, next) => {
        try {
            next();
        } catch (e) {
            next(e);
        }
    }
};
