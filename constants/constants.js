require('dotenv').config();

module.exports = {
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    PORT: process.env.PORT || 8000,
    DB_URL: process.env.DB_URL,
    ID_LENGTH: 24,
    USER_UPDATED: 'user info is successfully updated',
    USER_DELETED: 'user is successfully deleted',
    USER_LOGOUT: 'user is successfully logged out',
    USER_CREATED: 'user is successfully created',
    ROUTE_NOT_FOUND: 'Rout not found',
    UNKNOWN_ERROR: 'Unknown error',
    AUTHORIZATION: 'Authorization'
};
