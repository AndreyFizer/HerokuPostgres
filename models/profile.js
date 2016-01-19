// Created by andrey on 11.12.15.

"use strict";

var Sequelize = require('sequelize');

var MODELS = require('../constants/models');

module.exports = function (sequelize) {
    var ProfileModel;
    var options;

    var columns = {
        //user_id  : {
        //    type : Sequelize.INTEGER,
        //    field: 'user_id'
        //},
        firstName: {
            type : Sequelize.STRING,
            field: 'first_name'
        },
        lastName : {
            type : Sequelize.STRING,
            field: "last_name",
            set  : function (val) {
                this.setDataValue('lastName', val.toUpperCase());
            }
        }
    };

    options = {
        underscored  : true,
        getterMethods: {
            fullName: function () {
                return this.firstName + ' ' + this.lastName
            }
        },

        setterMethods: {
            fullName: function (value) {
                var names = value.split(' ');

                this.setDataValue('firstName', names.slice(0, -1).join(' '));
                this.setDataValue('lastName', names.slice(-1).join(' '));
            }
        }
    }

    ProfileModel = sequelize
        .define('profile', columns, options);

    //ProfileModel.belongsTo(sequelize.models.user);

    return ProfileModel;
}
    ;