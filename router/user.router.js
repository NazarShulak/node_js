const router = require('express').Router();

const {
    userController: {
        createUser,
        deleteUserById,
        getUserById,
        getUsers,
        updateUserById,
        addNewImages
    }
} = require('../controller');

const {
    userMiddleware: {
        checkIfUserIdValid,
        checkIfUserExist,
        checkIfUserRegistered,
        checkUserForUpdate,
        checkUserForCreation
    },

    authMiddleware: {
        accessTokenCheck
    },

    fileMiddleware: {
        checkAvatar, checkFiles,
    }
} = require('../middlewares');

router.get('/', getUsers);
router.get('/:userId', accessTokenCheck, checkIfUserIdValid, checkIfUserExist, getUserById);
router.post('/', checkIfUserRegistered, checkUserForCreation, checkAvatar, checkFiles, createUser);
router.post('/:userId/images', checkFiles, addNewImages);
router.delete('/:userId', accessTokenCheck, checkIfUserIdValid, checkIfUserExist, deleteUserById);
router.patch('/:userId', accessTokenCheck, checkIfUserIdValid, checkIfUserExist, checkUserForUpdate, updateUserById);

module.exports = router;
