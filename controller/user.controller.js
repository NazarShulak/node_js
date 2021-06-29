const { UserModel } = require('../dataBase');
const {
    constants: {
        USER_UPDATED,
        USER_DELETED,
        USER_CREATED
    }
} = require('../constants');

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
            await UserModel.create(req.body);

            res.json(USER_CREATED);
        } catch (e) {
            next(e);
        }
    },
    deleteUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await UserModel.findByIdAndRemove({ _id: userId });

            res.json(USER_DELETED);
        } catch (e) {
            next(e);
        }
    },
    updateUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;
            await UserModel.findOneAndUpdate({ _id: userId }, req.body);

            res.json(USER_UPDATED);
        } catch (e) {
            next(e);
        }
    }
};
