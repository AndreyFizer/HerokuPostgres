/**
 * Created by andrey on 27.12.15.
 */

"use strict";

var M = require('../constants/models');

var Models = function (sequelize) {
    var User;
    var Profile;

    User = this[M.USER] = require('./user')(sequelize);
    Profile = this[M.PROFILE] = require('./profile')(sequelize);

    Profile.belongsTo(User);
    User.hasOne(Profile);

    //sequelize.sync({force : true});
};

module.exports = Models;