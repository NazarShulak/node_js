const router = require('express').Router();

const { authController: { login, logout } } = require('../controller');
const { authMiddleware: { checkUserLogin, checkUserPasswordValidity, checkUserBody } } = require('../middlewares');

router.post('/login', checkUserBody, checkUserLogin, checkUserPasswordValidity, login);
router.post('/logout', checkUserBody, checkUserLogin, checkUserPasswordValidity, logout);

module.exports = router;
