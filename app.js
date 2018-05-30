var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//引入路由文件
var routes = require('./routes/web_routes');
//log4j
var log4js = require('log4js');
var app = express();
// 视图引擎配置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//配置Websocket
var server = require('http').createServer(app),
    io = require('socket.io').listen(server);
server.listen(30001);

var sockets = [];
//打开socket连接
io.sockets.on('connection', function (socket) {
  //向客户端发送news事件并携带数据
  //setInterval(function () {
  //   socket.emit('news', { hello: 'world' });
  //},3000);
  //接受客户端发送的数据
  //socket.on('setname', function (data) {
  //  console.log("客户端发送过来的数据：");
  //  console.log(data);
  //});
  console.log("add User"+socket.id);
  sockets.push(socket);
  sp_socket.acceptUserMag(socket,sockets);
});

io.sockets.on("disconnect", function (socket) {
   console.log("客户端已失去连接！！");
});
/**
 * log4j 配置
 */
log4js.configure({
  appenders: [
    { type: 'console' }, //控制台输出
    {
      type: 'file', //文件输出
      filename: 'logs/access.log',
      maxLogSize: 10240,
      backups:3,
      category: 'normal'
    }
  ],
  replaceConsole: true
});
var logger = log4js.getLogger('normal');
logger.setLevel('INFO');
app.use(log4js.connectLogger(logger, {level:'auto', format:':method :url'}));

// 中间件配置
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//跨域请求处理
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //设置前端自定义请求头为 Content-Type,Content-Length, Authorization, Accept,X-Requested-With
  //只有以上请求头才可被服务器所获取
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

//路由入口
app.use('/', routes);

// 404处理
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
