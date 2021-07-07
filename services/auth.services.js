const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const {
    constants: {
        ACCESS_TOKEN,
        REFRESH_TOKEN,
        ACCESS,
        ACCESS_TOKEN_LIFETIME,
        REFRESH_TOKEN_LIFETIME
    }
} = require('../constants');

module.exports = {
    generateTokens: () => {
        const accessToken = jwt.sign({}, ACCESS_TOKEN, { expiresIn: ACCESS_TOKEN_LIFETIME });
        const refreshToken = jwt.sign({}, REFRESH_TOKEN, { expiresIn: REFRESH_TOKEN_LIFETIME });

        return {
            accessToken,
            refreshToken
        };
    },

    verifyToken: async (token, tokenType = ACCESS) => {
        const secretWord = tokenType === ACCESS ? ACCESS_TOKEN : REFRESH_TOKEN;
        const verifyPromise = promisify(jwt.verify);

        await verifyPromise(token, secretWord);
    }
};
