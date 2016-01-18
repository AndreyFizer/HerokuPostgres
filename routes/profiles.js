// Created by andrey on 12.12.15.

"use strict";

var express = require('express');
var router = express.Router();

var ProfileHandler = require('../handler/profile');

module.exports = function (app) {
    var sequelize = app.get('sequelize');
    var profiles = new ProfileHandler(sequelize);

    router.get('/', profiles.getProfiles);

    return router;
};

