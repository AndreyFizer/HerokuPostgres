var express = require('express');

var UserHandler = require('../handler/user');
var ProfileHandler = require('../handler/profile');

module.exports = function (app) {
  var sequelize = app.get('sequelize');
  var userRouter = require('./users')(app);
  var profileRouter = require('./profiles')(app);
  var users = new UserHandler(sequelize);
  var profiles = new ProfileHandler(sequelize);

  app.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
  });

  app.use('/user', userRouter);
  app.use('/profile', profileRouter);

  function errorHandler(err, req, res, next) {
    var message;
    var status;

    if (typeof err !== 'object') {
      err = {};
    }

    message = err.message || 'DEFAULT_ERROR_MESSAGE';
    status = err.status || 500;

    var resObject = {
      error: {
        message: message,
        code   : status
      }
    };

    if (process.env === 'development') {
      resObject.stack = err.stack;
    }

    res.status(status).send(resObject);
  }

  app.use(errorHandler);
};