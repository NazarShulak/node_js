const router = require('express').Router();

const { mysqlController: { rt } } = require('../controller');

router.get('/', rt);

module.exports = router;
