import { UserModel } from '../dataBase';

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await UserModel.find({});

            res.json(users);
            next();
        } catch (e) {
            next(e);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await UserModel.find({ _id: userId });

            res.json(user);
            next();
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            await UserModel.findByIdAndUpdate({ _id: userId }, req.body);

            res.json('user is successfully created');
            next();
        } catch (e) {
            next(e);
        }
    },
    deleteUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await UserModel.findByIdAndRemove({ _id: userId });

            res.json('user is successfully deleted');
            next();
        } catch (e) {
            next(e);
        }
    },
    updateUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;
            await UserModel.findOneAndUpdate({ _id: userId }, req.body);

            res.json('user info is successfully updated');
            next();
        } catch (e) {
            next(e);
        }
    }
};
