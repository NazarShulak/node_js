const express = require('express');
const fileupload = require('express-fileupload');
const path = require("path");
require('dotenv').config();
const { sequelize } = require('./dataBase/MySQL');

const { constants: { PORT } } = require('./constants');
const { errorService: { _handleErrors, _notFoundHandler } } = require('./services');
const { userRouter, authRouter, mysqlRouter } = require('./router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));

app.use(fileupload({}));
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/mysql', mysqlRouter);
app.use('*', _notFoundHandler);
app.use(_handleErrors);

(async () => {
    await sequelize.sync();

    app.listen(PORT, () => {
        console.log(`App listen ${PORT}`);
    });
})();
