const router = require('express').Router();
const { userController } = require('../controller');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getUsers);
router.get('/:userId', userMiddleware.checkIfUserExist, userController.getUserById);
router.post('/', userMiddleware.checkIfUserRegistered, userController.createUser);
router.delete('/:userId', userMiddleware.checkIfUserExist, userController.deleteUserById);
router.patch('/:userId', userMiddleware.checkIfUserExist, userController.updateUserById);

module.exports = router;
