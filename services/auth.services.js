const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { constants: { ACCESS_TOKEN, REFRESH_TOKEN } } = require('../constants');

module.exports = {
    generateTokens: () => {
        const accessToken = jwt.sign({}, ACCESS_TOKEN, { expiresIn: '10m' });
        const refreshToken = jwt.sign({}, REFRESH_TOKEN, { expiresIn: '30d' });

        return {
            accessToken,
            refreshToken
        };
    },

    verifyToken: async (token, tokenType = 'access') => {
        const secretWord = tokenType === 'access' ? ACCESS_TOKEN : REFRESH_TOKEN;
        const verifyPromise = promisify(jwt.verify);

        await verifyPromise(token, secretWord);
    }
};
