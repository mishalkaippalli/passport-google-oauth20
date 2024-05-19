var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session")
require('dotenv').config();
const passport = require("passport")


var indexapp = require('./routes/index');
var usersapp = require('./routes/users');

var app = express();

const PORT = process.env.PORT || 4000

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexapp);
app.use('/users', usersapp);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
//   });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  })

    

app.listen(PORT, () => console.log(`app running on port ${PORT}`))

module.exports = app;
