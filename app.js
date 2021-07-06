const express = require('express');
require('dotenv').config();

const { constants: { PORT } } = require('./constants');
const { errorService: { _hadleErrors, _notFoundHandler } } = require('./services');
const { userRouter, authRouter } = require('./router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('*', _notFoundHandler);
app.use(_hadleErrors);

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});
