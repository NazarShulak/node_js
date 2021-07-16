const { Sequelize } = require('sequelize');

module.exports.sequelize = new Sequelize('users', 'root', 'Shulak5858613213119095', {
    dialect: 'mysql',
    logging: false
});
