const {
    constants: {USER_UPDATED, USER_DELETED},
    responseCodesEnum: {CREATED, NO_CONTENT, UPDATED},
    mailActionsEnum: {DELETE, WELCOME, UPDATE},
    itemTypes: {IMAGES, USERS}
} = require('../constants');
const {UserModel} = require('../dataBase');
const {userHelper, fileHelper: {_photoDirBuilder}} = require('../helpers');
const {mailService, passwordServices} = require('../services');

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
            const {userId} = req.params;
            const user = await UserModel.find({_id: userId});

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {password, ...other} = req.body;
            const {avatar} = req;

            const hashedPassword = await passwordServices.hash(password);
            const user = await UserModel.create({password: hashedPassword, ...other});

            const {_id} = user;

            if (avatar) {
                const {finalPath, photoPath} = await _photoDirBuilder(avatar.name, _id, 'users');
                await avatar.mv(finalPath);
                await UserModel.updateOne({_id}, {avatar: photoPath});
            }

            const normalizedUser = userHelper.userNormalizer(user.toJSON());

            await mailService.sendMail(req.body.login, WELCOME, {userName: req.body.name});

            res.status(CREATED).json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const {
                login: email,
                name
            } = await UserModel.findByIdAndRemove({_id: userId}, {useFindAndModify: false});

            await mailService.sendMail(email, DELETE, {userName: name});

            res.status(NO_CONTENT).json(USER_DELETED);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const {name, login: email} = req.body;

            await UserModel.findOneAndUpdate({_id: userId}, req.body, {useFindAndModify: false});
            await mailService.sendMail(email, UPDATE, {userName: name});

            res.status(UPDATED).json(USER_UPDATED);
        } catch (e) {
            next(e);
        }
    },

    addNewImages: async (req, res, next) => {
        try {
            const images = req.photos;
            const {_id} = req.user;

            const newAvatars = [];

            if (images.length) {
                for await (const image of images) {
                    const {finalPath, photoPath} = await _photoDirBuilder(image.name, _id, USERS, IMAGES);

                    await image.mv(finalPath);

                    newAvatars.push({path: photoPath});
                }

                await UserModel.updateOne({_id}, {$push: {avatars: {$each: newAvatars}}});
            }
            res.status(UPDATED).json('user is updated');
        } catch (e) {
            next(e);
        }
    }
};
