var express = require('express');
var router = express.Router();

var UserHandler = require('../handler/user');

module.exports = function(app){
  var sequelize = app.get('sequelize');
  var users = new UserHandler(sequelize);

  router.get('/', users.getUsers);
  router.post('/', users.createUser);

  return router;
};

