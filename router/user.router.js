const router = require('express')
    .Router();
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
        checkIfUserRegistered
    }
} = require('../middlewares');

router.get('/', getUsers);
router.get('/:userId', checkIfUserIdValid, checkIfUserExist, getUserById);
router.post('/', checkIfUserRegistered, createUser);
router.delete('/:userId', checkIfUserIdValid, checkIfUserExist, deleteUserById);
router.patch('/:userId', checkIfUserIdValid, checkIfUserExist, updateUserById);

module.exports = router;
