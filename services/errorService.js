const {
    responseCodesEnum: { NOT_FOUND, INTERNAL_ERROR },
    constants: { ROUTE_NOT_FOUND, UNKNOWN_ERROR }
} = require('../constants');

module.exports = {
    // eslint-disable-next-line no-unused-vars
    _handleErrors: (err, req, res, next) => {
        res.status(err.status || INTERNAL_ERROR).json({
            message: err.message || UNKNOWN_ERROR,
            customCode: err.customCode || 0
        });
    },

    _notFoundHandler: (err, req, res, next) => {
        next({
            status: err.status || NOT_FOUND,
            message: err.message || ROUTE_NOT_FOUND,
            customCode: err.customCode || 0
        });
    }
};
