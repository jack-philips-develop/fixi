const express = require('express');
const usersRouter = require('./users/app');
const accountRouter = require('./account/app');
const app = express();

app.use('/users', usersRouter);
app.use('/account', accountRouter);

module.exports = app;