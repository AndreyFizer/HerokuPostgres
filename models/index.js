/**
 * Created by andrey on 27.12.15.
 */

"use strict";

var MODELS = require('../constants/models');

var Models = function (sequelize) {

    this[MODELS.USER] = require('./user')(sequelize);
    this[MODELS.PROFILE] = require('./profile')(sequelize);

    this[MODELS.PROFILE].belongsTo( this[MODELS.USER]);
    this[MODELS.USER].hasOne(this[MODELS.PROFILE]);

    sequelize.sync({force : true});
    //sequelize.sync();
};

module.exports = Models;