const jwt = require('jsonwebtoken');

const { constants: { ACCESS_TOKEN, REFRESH_TOKEN } } = require('../constants');

module.exports = {
    generateTokens: () => {
        const accessToken = jwt.sign({}, ACCESS_TOKEN, { expiresIn: '10m' });
        const refreshToken = jwt.sign({}, REFRESH_TOKEN, { expiresIn: '30d' });

        return {
            accessToken,
            refreshToken
        }
    }
};
