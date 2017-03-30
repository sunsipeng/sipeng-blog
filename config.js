/**
 * Created by chancy on 2017/3/11.
 */
var mc = require('./common/mysql-config');
var config = {
    mysql: {
        host     : mc.host,
        user     : mc.user,
        password : mc.password,
        port: mc.port,
        database: mc.database
    },
    port: 8080,
    auth_cookie_name: 'sipeng-server-cookie',
    session_secret:'sipeng-server_secret'
};

module.exports = config;