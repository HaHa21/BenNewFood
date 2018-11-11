var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user');
var messageRoutes = require('./routes/messages');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

mongoose.connect('mongodb://localhost:27017/BenFastFood').then(() => {
  console.log("connected to db!");
}).catch(() => {
  console.log("con failed!");
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Request-Headers, Access-Control-Allow-Headers');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, HEAD, OPTIONS, PUT');

    next();
});

app.use('/messages', messageRoutes);
app.use('/user', userRoutes);
app.use('/', appRoutes);

app.use((req,res,next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    console.log('header-interceptor: error 500.')
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});

module.exports = app;
