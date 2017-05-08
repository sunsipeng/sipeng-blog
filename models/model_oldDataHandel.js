/**
 * Created by chancy on 2017/3/9.
 */
var connect = require('../models/connect-db-oldData');

/**
 * 查询所有用户
 */
exports.getAllUser = function (callback) {
    var sql = 'SELECT id FROM users';
    connect.query(sql,callback);
};

/**
 * 通过userId更新加班时间（只更新第一条数据）
 */
exports.updateOverTimeByUserId = function (params,callback){
    var sql = 'UPDATE work_summary SET overtime="'+params.overtime+'" WHERE user_id="'+params.uid+'" ' +
        'AND create_time >= "'+params.startTime+'" AND create_time <="'+params.endTime+'"  LIMIT 1';//ORDER BY create_time ASC
    connect.query(sql,callback);
};

/**
 * 查询当天所有工作记录
 */
exports.queryCurrentWorkRecord = function (param,userId,callback) {
    var sql = 'SELECT * FROM work_summary WHERE create_time >= "'+param.startTime+'" AND create_time <="'+param.endTime+'" AND user_id="'+userId+'" AND work_state=1';
    connect.query(sql,callback);
};

/**
 * 查询用户昨天工作中数据
 */
exports.queryYesterdayWorkingRecord = function (param,callback) {
    var sql = 'SELECT * FROM work_summary WHERE create_time >= "'+param.startTime+'" AND create_time <="'+param.endTime+'" AND work_state=0';
    connect.query(sql,callback);
};

/**
 * 添加工作记录（工作完成）
 */
exports.addWorkCompleted = function($work,callback){
    var sql = 'UPDATE work_summary SET end_worktime = "'+$work.endTime+'" , self_score = "'+$work.score+'" , ' +
        'work_content="'+$work.workContent+'" , work_state=1,work_time="'+$work.workTime+'" WHERE id="'+$work.id+'"';
    connect.query(sql,callback);
};
