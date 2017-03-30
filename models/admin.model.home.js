/**
 * Created by chancy on 2017/3/21.
 */

exports.getChannelInfoAsAdmin = function (callback) {
    var sql = 'SELECT name FROM channel';
    connect.query(sql,callback);
};

exports.addChannelModel = function (channelName,createTime,callback) {
    var sql = 'INTER INTO channel(name,create_time) VALUES(?,?)';
    var sql_params = [channelName,createTime];
    connect.query(sql,sql_params,callback);
};