const express = require('express');
require('dotenv').config();
const { sequelize } = require('./dataBase/MySQL');

const { constants: { PORT } } = require('./constants');
const { errorService: { _hadleErrors, _notFoundHandler } } = require('./services');
const { userRouter, authRouter, mysqlRouter } = require('./router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/mysql', mysqlRouter);
app.use('*', _notFoundHandler);
app.use(_hadleErrors);

(async () => {
    await sequelize.sync();

    app.listen(PORT, () => {
        console.log(`App listen ${PORT}`);
    });
})();
