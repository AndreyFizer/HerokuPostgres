/**
 * Created by andrey on 29.10.15.
 */

"use strict";

var Sequelize = require('sequelize');

module.exports = function (sequelize) {
    var UserModel;
    var options;

    var columns = {
        email   : {
            type    : Sequelize.STRING,
            validate: {
                isEmail: {
                    msg: "Ololololo - bad email :("
                }
            }
        },
        password: {type: Sequelize.STRING},
        status  : {type: Sequelize.INTEGER}
    };

    options = {
        timestamps : true,
        //paranoid   : true,
        underscored: true
    };

    UserModel = sequelize
        .define('user', columns, options);

    return UserModel;
};