const router = require('express').Router();

const { authController: { login } } = require('../controller');
const { authMiddleware: { checkUserLogin, checkUserPasswordValidity, checkUserBody } } = require('../middlewares');

router.post('/', checkUserBody, checkUserLogin, checkUserPasswordValidity, login);

module.exports = router;
