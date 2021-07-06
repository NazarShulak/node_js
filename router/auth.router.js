const router = require('express').Router();

const { authController: { login, logout } } = require('../controller');
const {
    authMiddleware: {
        checkUserLogin,
        checkUserPasswordValidity,
        checkUserBody,
        accessTokenCheck
    }
} = require('../middlewares');

router.post('/login', checkUserBody, checkUserLogin, checkUserPasswordValidity, login);
router.post('/logout', accessTokenCheck, logout);

module.exports = router;
