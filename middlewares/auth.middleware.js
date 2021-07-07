const {
    responseCodesEnum: { NOT_FOUND, BAD_REQUEST, UNAUTHORIZED },
    constants: { AUTHORIZATION, REFRESH }
} = require('../constants');
const { UserModel, OAuthModel } = require('../dataBase');
const {
    ErrorHandler,
    errorMessages: { WRONG_LOGIN_PASSWORD, NOT_VALID_DATA, UNAUTHORIZED_BAD_TOKEN }
} = require('../errors');
const { passwordServices, authServices } = require('../services');
const { authValidator: { loginUser } } = require('../validators');

module.exports = {
    checkUserLogin: async (req, res, next) => {
        try {
            const { login } = req.body;
            const user = await UserModel.findOne({ login });

            if (!user) {
                throw new ErrorHandler(NOT_FOUND, WRONG_LOGIN_PASSWORD.message, WRONG_LOGIN_PASSWORD.customCode);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserPasswordValidity: async (req, res, next) => {
        try {
            const { body: { password }, user: { password: hashedPassword } } = req;

            await passwordServices.compare(password, hashedPassword);

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserBody: (req, res, next) => {
        try {
            const { error } = loginUser.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, NOT_VALID_DATA.message, NOT_VALID_DATA.customCode);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    accessTokenCheck: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(UNAUTHORIZED, UNAUTHORIZED_BAD_TOKEN.message, UNAUTHORIZED_BAD_TOKEN.customCode);
            }

            await authServices.verifyToken(token);

            const userObject = await OAuthModel.findOne({ accessToken: token });

            if (!userObject) {
                throw new ErrorHandler(UNAUTHORIZED, UNAUTHORIZED_BAD_TOKEN.message, UNAUTHORIZED_BAD_TOKEN.customCode);
            }

            req.user = userObject;
            
            next();
        } catch (e) {
            next(e);
        }
    },

    refreshTokenCheck: async (req, res, next) => {
        try {
            const refreshToken = req.get(AUTHORIZATION);

            if (!refreshToken) {
                throw new ErrorHandler(UNAUTHORIZED, UNAUTHORIZED_BAD_TOKEN.message, UNAUTHORIZED_BAD_TOKEN.customCode);
            }

            await authServices.verifyToken(refreshToken, REFRESH);

            const userObject = await OAuthModel.findOne({ refreshToken });

            if (!userObject) {
                throw new ErrorHandler(UNAUTHORIZED, UNAUTHORIZED_BAD_TOKEN.message, UNAUTHORIZED_BAD_TOKEN.customCode);
            }

            req.user = userObject.user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
