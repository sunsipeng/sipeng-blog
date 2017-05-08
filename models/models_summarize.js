/**
 * Created by chancy on 2017/2/16.
 * 总结 Models
 */
//var connect = require('../models/connect-db');

/**
 * 查询当天数据
 * @param startTime
 * @param endTime
 * @param callback
 */
exports.queryCurrentData = function (startTime,endTime,callback) {
    var sql = 'SELECT * FROM work_summary WHERE create_time >= "'+startTime+'" AND create_time <="'+endTime+'"';
    global.connect.query(sql,callback);
};

/**
 * 查询当天所有工作记录
 */
exports.queryCurrentWorkRecord = function (param,userId,callback) {
    var sql = 'SELECT work_time,user_id,self_score FROM work_summary WHERE create_time >= "'+param.startTime+'" AND create_time <="'+param.endTime+'" AND user_id="'+userId+'" AND work_state=1';
    global.connect.query(sql,callback);
};

/**
 * 查询所有用户
 */
exports.getAllUser = function (callback) {
    var sql = 'SELECT id,reality_name FROM users';
    global.connect.query(sql,callback);
};

/**
 * 通过user_id查询人员真实姓名
 */
exports.queryUserByUserId = function (userId,callback) {
    var sql = 'SELECT reality_name FROM users WHERE id="'+userId+'"';
    global.connect.query(sql,callback);
};
/**
 * 查询所有工作记录
 */
exports.queryAllWorkRecord = function (callback) {
   var sql = 'SELECT create_time FROM work_summary';
   global.connect.query(sql,callback);
};