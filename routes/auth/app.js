const express = require('express');
const usersRouter = require('./users/app');
const app = express();

app.use('/users', usersRouter);

module.exports = app;