/**
 * Created by chancy on 2017/2/5.
 * 数据连接
 */
var mysql = require('mysql');
var config = require('../config');
var logger = require('log4js').getLogger("database");

var connectDb = function(){
    //mysql
    global.connect = mysql.createConnection({
        host     : config.mysql.host,
        user     : config.mysql.user,
        password : config.mysql.password,
        port: config.mysql.port,
        database: config.mysql.database,
        multipleStatements: true,//多SQL执行
        debug: ['ComQueryPacket'] //开启调试模式（查看执行的SQL语句）
    });

    global.connect.connect(function(err) {
        if (err) {
            logger.error('error connecting: ' + err.stack);
            setTimeout(connectDb , 2000);
            return;
        }
        logger.info('connect databases success for mysql...' + global.connect.threadId);
    });

    global.connect.on('error', function (err) {
        logger.error('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            logger.debug('mysql 断线重连中........');
            connectDb();
        } else {
            throw err;
        }
    });
};

connectDb();
