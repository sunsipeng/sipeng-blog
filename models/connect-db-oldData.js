/**
 * Created by chancy on 2017/3/9.
 */
/**
 * Created by chancy on 2017/2/5.
 * 数据连接
 */
var mysql = require('mysql');
var config = require('../config');
var logger = require('log4js').getLogger("database-old-data");

var connection = null;
var connectDb = function(){
    //mysql
    connection = mysql.createConnection({
        host     : config.mysql.host,
        user     : config.mysql.user,
        password : config.mysql.password,
        port: config.mysql.port,
        database: config.mysql.database,
        multipleStatements: true,//多SQL执行
        debug: ['ComQueryPacket'], //开启调试模式（查看执行的SQL语句）
        //wait_timeout:0
    });

    connection.connect(function(err) {
        if (err) {
            logger.error('error connecting: ' + err.stack);
            setTimeout(connectDb , 2000);
            return;
        }
        logger.info('connect '+config.mysql.host+' databases success for mysql...' +connection.threadId);
    });

    connection.on('error', function (err) {
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

module.exports = connection;