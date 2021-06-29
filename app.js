const express = require('express');
const mongoose = require('mongoose');

const {
    constants: {
        ROUTE_NOT_FOUND,
        PORT
    },
    errorCodesEnum
} = require('./constants');
const { userRouter } = require('./router');

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('*', _notFoundHandler);
app.use(_hadleErrors);

app.listen(PORT, () => {
    console.log('App listen 8000');
});

// eslint-disable-next-line no-unused-vars
function _hadleErrors(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message || 'Unknown error',
            customCode: err.customCode || 0
        });
}

function _notFoundHandler(err, req, res, next) {
    next({
        status: err.status || errorCodesEnum.NOT_FOUND,
        message: err.message || ROUTE_NOT_FOUND
    });
}

function _mongooseConnector() {
    mongoose.connect('mongodb://localhost:27017/users', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
