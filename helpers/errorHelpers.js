const { responseCodesEnum: { NOT_FOUND }, constants: { ROUTE_NOT_FOUND } } = require('../constants');

module.exports = {
    // eslint-disable-next-line no-unused-vars
    _hadleErrors: (err, req, res, next) => {
        res.status(err.status || 500)
            .json({
                message: err.message || 'Unknown error',
                customCode: err.customCode || 0
            });
    },

    _notFoundHandler: (err, req, res, next) => {
        next({
            status: err.status || NOT_FOUND,
            message: err.message || ROUTE_NOT_FOUND
        });
    }
};
