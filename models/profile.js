// Created by andrey on 11.12.15.

"use strict";

var Sequelize = require('sequelize');

var MODELS = require('../constants/models');


module.exports = function (sequelize) {
    var ProfileModel;
    var options;

    var columns = {
        userId   : {type: Sequelize.INTEGER, field: 'user_id'},
        firstName: {type: Sequelize.STRING, field: 'first_name'},
        lastName : {type: Sequelize.STRING, field: "last_name"}
    };

    options = {
        underscored: true
    };

    ProfileModel = sequelize
        .define('profile', columns, options);

    //ProfileModel.belongsTo(sequelize.models.user);

    return ProfileModel;
};