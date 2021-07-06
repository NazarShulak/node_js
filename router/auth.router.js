const router = require('express').Router();

const { authController: { login, logout, refresh } } = require('../controller');
const {
    authMiddleware: {
        checkUserLogin,
        checkUserPasswordValidity,
        checkUserBody,
        accessTokenCheck,
        refreshTokenCheck
    }
} = require('../middlewares');

router.post('/login', checkUserBody, checkUserLogin, checkUserPasswordValidity, login);
router.post('/logout', accessTokenCheck, logout);
router.post('/refresh', refreshTokenCheck, refresh);

module.exports = router;
