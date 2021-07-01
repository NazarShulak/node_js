const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddleware: { checkIfUserExist, checkIfPasswordValid } } = require('../middlewares');

router.post('/', checkIfUserExist, checkIfPasswordValid, authController);

module.exports = router;
