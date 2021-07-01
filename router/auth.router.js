const router = require('express').Router();

const { authController: { login } } = require('../controller');
const { authMiddleware: { checkIfUserExist, checkIfPasswordValid } } = require('../middlewares');

router.post('/', checkIfUserExist, checkIfPasswordValid, login);

module.exports = router;
