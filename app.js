var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('./config');
var auth = require('./common/auth');

var admin = require('./routes/admin.routes');
var application = require('./routes/app.routes');
require('./models/connect-db');//连接数据库

var app = express();

//log4js
var log4js = require('log4js');
log4js.configure('./log4js.json');
var logger = log4js.getLogger("main");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /assets
app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto', format:':remote-addr - -' +
' ":method :url HTTP/:http-version"' +
' :status :content-length ":referrer"'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('method-override')());
app.use(cookieParser(config.session_secret));
app.use(express.static(path.join(__dirname, 'assets')));

//session
app.use(session({
  secret: config.session_secret,
  resave: true,
  saveUninitialized: true
}));

app.use(auth.authUser);

app.use('/admin', admin);
app.use('/app', application);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    logger.info(app.get('env') + '==' + err.status);
    logger.info("Something went wrong:....", err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  logger.error("Something went wrong:", err);
  logger.info(req.app.get('env') + '===='  + JSON.stringify(err));

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
