const express = require('express');
require('dotenv').config();

const { constants: { PORT } } = require('./constants');
const { errorHelpers: { _notFoundHandler, _hadleErrors } } = require('./helpers');
const { userRouter, authRouter } = require('./router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('*', _notFoundHandler);
app.use(_hadleErrors);

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});
