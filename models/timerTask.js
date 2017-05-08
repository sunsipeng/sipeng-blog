/**
 * Created by chancy on 2017/2/24.
 * 定时任务 models
 */

//var connect = require('../models/connect-db');

/**
 * 查询用户昨天工作中数据
 */
exports.queryYesterdayWorkingRecord = function (param,callback) {
    var sql = 'SELECT * FROM work_summary WHERE create_time >= "'+param.startTime+'" AND create_time <="'+param.endTime+'" AND work_state=0';
    global.connect.query(sql,callback);
};

/**
 * 查询当天所有工作记录
 */
exports.queryCurrentWorkRecord = function (param,userId,callback) {
    var sql = 'SELECT * FROM work_summary WHERE create_time >= "'+param.startTime+'" AND create_time <="'+param.endTime+'" AND user_id="'+userId+'" AND work_state=1';
    global.connect.query(sql,callback);
};

/**
 * 查询所有用户
 */
exports.getAllUser = function (callback) {
    var sql = 'SELECT id FROM users';
    global.connect.query(sql,callback);
};

/**
 * 通过userId更新加班时间（只更新第一条数据）
 */
exports.updateOverTimeByUserId = function (params,callback){
    var sql = 'UPDATE work_summary SET overtime="'+params.overtime+'" WHERE user_id="'+params.uid+'" ' +
              'AND create_time >= "'+params.startTime+'" AND create_time <="'+params.endTime+'"  LIMIT 1';//ORDER BY create_time ASC
    global.connect.query(sql,callback);
};
/**
 * 解决mysql无活动8小时后自动断开连接
 */
exports.autoQueryData = function (callback) {
    var sql = 'SELECT * FROM invoices';
    global.connect.query(sql,callback);
};