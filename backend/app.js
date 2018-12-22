var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var userRoutes = require('./routes/user');
var messageRoutes = require('./routes/reviews');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect("mongodb://Tom:Tom123@ds155653.mlab.com:55653/benfood", { useNewUrlParser: true }).then(() => {
  console.log("connected to db!");
}).catch(() => {
  console.log("con failed!");
});

app.use('/api/messages', messageRoutes);
app.use('/api/user', userRoutes);


if(process.env.NODE_ENV === 'production'){
  const appPath = path.join(__dirname, 'dist');

  app.use(express.static(appPath));

  app.get('*', function(req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
}

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
