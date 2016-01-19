'use strict';
var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Models = require('./models');
var Sequelize = require('sequelize');
var app = express();
var sequelize;
var httpServer;

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}

if (process.env.NODE_ENV === 'development') {
    console.log('=== >    Server start success in Development version');
    require('./config/development');
}

sequelize = new Sequelize('postgres://gdxjhecgoheebi:DegR8QuZsKz8vgZkXlR6xHsDgX@ec2-107-22-170-249.compute-1.amazonaws.com:5432/dc87cfltq484jf', {
    dialectOptions: {
        ssl: true
    }
});

//sequelize = new Sequelize(
//    process.env.DATABASE,
//    process.env.RDS_USERNAME,
//    process.env.RDS_PASSWORD, {
//        host   : process.env.RDS_HOSTNAME,
//        dialect: "postgres",
//        native : true,
//        pool   : {
//            max : 5,
//            min : 0,
//            idle: 10000
//        }
//    });

app.set('sequelize', sequelize);
sequelize.Models = new Models(sequelize);

httpServer = http.createServer(app);
app.set('port', process.env.PORT || '8821');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false, limit: 1024 * 1024 * 5}));
app.use(bodyParser.json({limit: 1024 * 1024 * 5}));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

require('./routes/index')(app);

httpServer.listen(app.get('port'), function () {
    console.log("=== >    Express server listening on port " + app.get('port'));
    console.log("=== >    HOST: " + process.env.HOST);
    console.log("=== >    RDS_HOSTNAME: " + process.env.RDS_HOSTNAME);
    console.log("=== >    DATABASE: " + process.env.DATABASE);
});

/*module.exports = app;*/