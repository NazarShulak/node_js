const router = require('express').Router();

const {
    userController: {
        createUser,
        deleteUserById,
        getUserById,
        getUsers,
        updateUserById
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
    }
} = require('../middlewares');

router.get('/', getUsers);
router.get('/:userId', accessTokenCheck, checkIfUserIdValid, checkIfUserExist, getUserById);
router.post('/', checkIfUserRegistered, checkUserForCreation, createUser);
router.delete('/:userId', accessTokenCheck, checkIfUserIdValid, checkIfUserExist, deleteUserById);
router.patch('/:userId', accessTokenCheck, checkIfUserIdValid, checkIfUserExist, checkUserForUpdate, updateUserById);

module.exports = router;
