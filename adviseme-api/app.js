var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var config = require('./config.json');
var jwt = require('jsonwebtoken');

// Get the API route ...
var api = require('./routes/api.route')

var app = express();

mongoose.Promise = bluebird
mongoose.connect('mongodb://127.0.0.1:27017/adviseMe', { useMongoClient: true})
.then(()=> { console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/adviseMe`)})
.catch(()=> { console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/adviseMe`)})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));


//TODO: Do not allow the display of data... will have to be from issuer
app.all('/api/*', function(req, res, next) {
  //console.log(req.headers);
  if(req.url === '/api/users/authenticate' || req.url === '/api/users/register' || req.url === '/api/token/valid') {
    next();
  } else {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      try {
        var decoded = jwt.verify(req.headers.authorization.split(' ')[1], config.secret);
      } catch(err) {
        res.status(401).send({ error: 'Not valid token' })
      }
      next();
    } else {
      res.status(400).send({ error: 'No token' })
    }
  }
});

//Use the API routes in api.route.js
app.use(api);

// Angular DIST output folder
app.use(express.static('../adviseme-webapp/dist'));

// Serve user profile images
app.use('/uploads', express.static(__dirname + '/uploads'));

// Set all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../adviseme-webapp/dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
