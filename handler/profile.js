// Created by andrey on 12.12.15.

"use strict";

var MODELS = require('../constants/models');

var ProfileHandler = function(sequelize){
    var Models = sequelize.Models;
    var ProfileModel = Models[MODELS.PROFILE];

    this.getProfiles = function(req, res, next){

        ProfileModel
            .findAll()
            .then(function(result){

                res.status(200).send(result);

            })
            .catch(function(error){

                return next(error);

            })
    };

    this.createUser = function(req, res, next){

        ProfileModel

    };
};

module.exports = ProfileHandler;