var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
require('./models/connect-db');//连接数据库
var app = express();
var config = require('./config');
var session = require('express-session');
var auth = require('./common/auth');
var moment = require('moment');

/**
 * 运行定时任务
 */
var timerTask = require('./controllers/timerTask');
var timerTaskFlag = true;
var workRecordtimer = setInterval(function () {
  var endMo = moment().format('YYYY-MM-DD')+' '+config.workStartTime;
  var currentMo = moment().format('YYYY-MM-DD HH:mm');
  //logger.debug(currentMo);
  if (currentMo == endMo) {
    if (timerTaskFlag) {
      logger.debug('开始定时任务.....');
      //结算工作记录
      timerTask.timerWorkRecoed();
      timerTaskFlag = false;
    }
  } else {
    timerTaskFlag = true;
  }
},1000);

/**
 * 解决mysql无活动8小时后自动断开连接
 * 每隔两小时自动查询数据
 */
//var autoQueryTimer = setInterval(function () {
//    timerTask.autoQuery();
//},1000*60*60*2);

//log4js
var log4js = require('log4js');
log4js.configure('./log4js.json');
var logger = log4js.getLogger("main");
//var env = process.env.NODE_ENV || "development"

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto', format:':remote-addr - -' +
' ":method :url HTTP/:http-version"' +
' :status :content-length ":referrer"'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('method-override')());
app.use(cookieParser(config.session_secret));
app.use(express.static(path.join(__dirname, 'public')));

//session
app.use(session({
  secret: config.session_secret,
  resave: true,
  saveUninitialized: true,
}));

//跨域请求处理
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  if(req.method=="OPTIONS") {
    res.send(200);
  }else {
    /*让options请求快速返回*/
    next();
  }
});

app.use(auth.authUser);

app.use('/', index);


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
