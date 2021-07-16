const router = require('express').Router();

const {mysqlController: {getById, createUser, removeUser, getStudents}} = require('../controller');

router.get('/', getStudents);
router.get('/:id', getById);
router.post('/', createUser);
router.delete('/:id', removeUser);

module.exports = router;
