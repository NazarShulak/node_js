require('dotenv').config();

module.exports = {
    ACCESS: 'access',
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    ACCESS_TOKEN_LIFETIME: '40m',
    AUTHORIZATION: 'Authorization',
    DB_URL: `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@test.ulyb3.mongodb.net/Users?retryWrites=true&w=majority`,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    ID_LENGTH: 24,
    PORT: process.env.PORT || 8000,
    REFRESH: 'refresh',
    REFRESH_TOKEN_LIFETIME: '30d',
    ROUTE_NOT_FOUND: 'Rout not found',
    SYSTEM_MAIL: process.env.SYSTEM_MAIL,
    SYSTEM_MAIL_PASS: process.env.SYSTEM_MAIL_PASS,
    USER_UPDATED: 'user info is successfully updated',
    USER_DELETED: 'user is successfully deleted',
    USER_LOGOUT: 'user is successfully logged out',
    USER_CREATED: 'user is successfully created',
    UNKNOWN_ERROR: 'Unknown error',
    WRONG_TOKEN: 'Wrong token'
};
