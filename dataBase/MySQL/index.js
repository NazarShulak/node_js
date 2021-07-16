const { Sequelize } = require('sequelize');

module.exports.sequelize = new Sequelize('users', 'root', 'root', {
    dialect: 'mysql',
    logging: false
});
