require('dotenv').config();

module.exports = {
    ACCESS: 'access',
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    ACCESS_TOKEN_LIFETIME: '40m',
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    REFRESH_TOKEN_LIFETIME: '30d',
    REFRESH: 'refresh',
    DB_URL: `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@test.ulyb3.mongodb.net/Users?retryWrites=true&w=majority`,
    PORT: process.env.PORT || 8000,
    SYSTEM_MAIL: process.env.SYSTEM_MAIL,
    SYSTEM_MAIL_PASS: process.env.SYSTEM_MAIL_PASS,

    AUTHORIZATION: 'Authorization',

    ID_LENGTH: 24,
    ROUTE_NOT_FOUND: 'Rout not found',
    USER_UPDATED: 'user info is successfully updated',
    USER_DELETED: 'user is successfully deleted',
    USER_LOGOUT: 'user is successfully logged out',
    USER_CREATED: 'user is successfully created',
    UNKNOWN_ERROR: 'Unknown error',
    WRONG_TOKEN: 'Wrong token',

    PHOTO_MAX_SIZE: 2 * 1024 * 1024,
    FILE_MAX_SIZE: 5 * 1024 * 1024,
    VIDEO_MAX_SIZE: 15 * 1024 * 1024,

    PHOTOS_MIMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/tiff',
        'image/webp'
    ],

    DOCS_MIMETYPES: [
        'application/msword',
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],

    VIDEOS_MIMETYPES: ['video/mpeg', 'video/mp4']
};
