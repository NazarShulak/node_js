const { UserModel } = require('../dataBase');

const { userValidator: { createUser, updateUser } } = require('../validators');
const {
    responseCodesEnum: {
        NOT_FOUND,
        CONFLICT,
        BAD_REQUEST
    },
    constants: { ID_LENGTH }
} = require('../constants');

const {
    ErrorHandler,
    errorMessages: {
        USER_ALREADY_LOGGED,
        RECORD_NOT_FOUND,
        NOT_VALID_USER_ID,
        NOT_VALID_DATA
    }
} = require('../errors');

module.exports = {
    checkIfUserExist: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await UserModel.findById(userId);

            if (!user) {
                throw new ErrorHandler(NOT_FOUND, RECORD_NOT_FOUND.message, RECORD_NOT_FOUND.customCode);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkIfUserRegistered: async (req, res, next) => {
        try {
            const { login } = req.body;
            const user = await UserModel.findOne({ login });

            if (user) {
                throw new ErrorHandler(CONFLICT, USER_ALREADY_LOGGED.message, USER_ALREADY_LOGGED.customCode);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIfUserIdValid: (req, res, next) => {
        try {
            const { userId } = req.params;

            if (userId.length !== ID_LENGTH) {
                throw new ErrorHandler(CONFLICT, NOT_VALID_USER_ID.message, NOT_VALID_USER_ID.customCode);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserForUpdate: (req, res, next) => {
        try {
            const { error } = updateUser.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message, NOT_VALID_DATA.customCode);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserForCreation: (req, res, next) => {
        try {
            const { error } = createUser.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message, NOT_VALID_DATA.customCode);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
