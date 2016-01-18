/**
 * Created by andrey on 11.12.15.
 */

"use strict";

var MODELS = require('../constants/models');
var async = require('async');

var UserHandler = function (sequelize) {
    var Models = sequelize.Models;
    var UserModel = Models[MODELS.USER];
    var ProfileModel = Models[MODELS.PROFILE];

    this.getUsers = function (req, res, next) {

        UserModel
            .findAll({
                include: [ProfileModel]
            })
            .then(function (result) {

                res.status(200).send(result);

            })
            .catch(function (error) {

                return next(error);

            })
    };

    this.createUser = function (req, res, next) {
        var options = req.body;
        var email = options.email;
        var password = options.password;
        var status = options.status;
        var firstName = options.firstName;
        var lastName = options.lastName;
        var error;

        if (!email) {
            error = new Error("Email is required field");
            error.status = 400;
            return next(error);
        }

        if (!password) {
            error = new Error("Password is required field");
            error.status = 400;
            return next(error);
        }

        if (!status) {
            error = new Error("Status is required field");
            error.status = 400;
            return next(error);
        }

        if (!firstName || !lastName) {
            error = new Error("Names are required fields");
            error.status = 400;
            return next(error);
        }

        async.waterfall([

            function(cb){
                var saveData ={
                    email   : email,
                    password: password,
                    status  : status
                };

                UserModel
                    .create(saveData)
                    .then(function (result) {
                            //res.status(200).send(result);
                            cb(null, result)
                        }
                    )
                    .catch(function (err) {
                        return cb(err);
                    })
            },

            function(userModel, cb){
                var saveData ={
                    user_id   : userModel.id,
                    firstName: firstName,
                    lastName : lastName
                };

                ProfileModel
                    .create(saveData)
                    .then(function (result) {
                            cb()
                        }
                    )
                    .catch(function (err) {
                        return cb(err);
                    })
            }

        ], function(err){
            if (err){
                return next(err);
            }

            res.status(200).send({success : "Successfully created"});
        });


    };
};

module.exports = UserHandler;