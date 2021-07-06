const mongoose = require('mongoose');
const { constants: { DB_URL } } = require('../constants');

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports.UserModel = require('./UserModel');
module.exports.OAuthModel = require('./OAuthModel');
