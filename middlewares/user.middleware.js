const { UserModel } = require('../dataBase');
const {
    ErrorHandler,
    errorMessages
} = require('../errors');
const {
    errorCodesEnum: {
        NOT_FOUND,
        BAD_REQUEST
    }
} = require('../constants');

module.exports = {
    checkIfUserExist: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await UserModel.find({ _id: userId });

            if (!user) {
                throw new ErrorHandler(NOT_FOUND, errorMessages.RECORD_NOT_FOUND.message, errorMessages.RECORD_NOT_FOUND.code);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkIfUserRegistered: async (req, res, next) => {
        try {
            const users = await UserModel.find({});
            const userToCheck = users.find((user) => user.login === req.body.login);

            if (userToCheck) {
                throw new ErrorHandler(BAD_REQUEST,
                    errorMessages.USER_ALREADY_LOGGED.message,
                    errorMessages.USER_ALREADY_LOGGED.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
