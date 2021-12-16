const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const plantsRouter = require('./routes/plants');

const app = express();

require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/plants', plantsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

module.exports = app;
