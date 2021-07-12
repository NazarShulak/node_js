const { mailActionsEnum: { DELETE, WELCOME, UPDATE } } = require('../constants');
const { UserModel } = require('../dataBase');
const { mailService } = require('../services');
const {
    constants: {
        USER_UPDATED,
        USER_DELETED,
        USER_CREATED
    },
    responseCodesEnum: { CREATED, NO_CONTENT, UPDATED }
} = require('../constants');
const { passwordServices } = require('../services');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await UserModel.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await UserModel.find({ _id: userId });

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password, ...other } = req.body;
            const { name, email } = req.params;
            const hashedPassword = await passwordServices.hash(password);

            await UserModel.create({ password: hashedPassword, ...other });
            await mailService.sendMail(email, WELCOME, { userName: name });

            res.status(CREATED).json(USER_CREATED);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { userId, email } = req.params;
            const user = await UserModel.findByIdAndRemove({ _id: userId }, { useFindAndModify: false });

            await mailService.sendMail(email, DELETE, { userName: user.name });

            res.status(NO_CONTENT).json(USER_DELETED);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const { userId, email } = req.params;
            const { name } = req.body;

            await UserModel.findOneAndUpdate({ _id: userId }, req.body, { useFindAndModify: false });
            await mailService.sendMail(email, UPDATE, { userName: name });

            res.status(UPDATED).json(USER_UPDATED);
        } catch (e) {
            next(e);
        }
    }
};
