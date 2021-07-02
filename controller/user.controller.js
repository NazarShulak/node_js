const { UserModel } = require('../dataBase');
const {
    constants: {
        USER_UPDATED,
        USER_DELETED,
        USER_CREATED
    },
    responseCodesEnum: { CREATED, DELETED, UPDATED }
} = require('../constants');
const { passwordHasher } = require('../helpers');

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
            const hashedPassword = await passwordHasher.hash(password);

            await UserModel.create({ password: hashedPassword, ...other });

            res.status(CREATED).json(USER_CREATED);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await UserModel.findByIdAndRemove({ _id: userId }, { useFindAndModify: false });

            res.status(DELETED).json(USER_DELETED);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;
            await UserModel.findOneAndUpdate({ _id: userId }, req.body, { useFindAndModify: false });

            res.status(UPDATED).json(USER_UPDATED);
        } catch (e) {
            next(e);
        }
    }
};
