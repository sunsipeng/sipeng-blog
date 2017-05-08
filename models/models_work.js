/**
 * Created by chancy on 2017/2/7.
 * 工作总结models
 */
//var connect = require('../models/connect-db');
var logger = require('log4js').getLogger('work_models');

//添加工作记录(初次添加)
exports.addWorkRecord = function (work,callback) {
    var field = 'user_id,work_content,create_time,start_worktime,work_state';
    var sql = 'INSERT INTO work_summary('+field+') VALUES (?,?,?,?,?)';
    var sql_params = [work.uid,work.workContent,work.createTime,work.startTime,0];//默认工作状态为0: 工作中
    global.connect.query(sql,sql_params,callback);
};

/**
 * 添加工作记录（工作完成）
 */
exports.addWorkCompleted = function($work,callback){
    var sql = 'UPDATE work_summary SET end_worktime = "'+$work.endTime+'" , self_score = "'+$work.score+'" , ' +
              'work_content="'+$work.workContent+'" , work_state=1,work_time="'+$work.workTime+'" WHERE id="'+$work.id+'"';
    global.connect.query(sql,callback);
};

/**
 * 查询用户当天工作记录
 */
exports.queryUserCurrentDayWorkRecord = function (times,callback) {
    var sql = 'SELECT * FROM work_summary WHERE create_time >= "'+times.startTime+'" AND create_time <= "'+times.endTime+'" AND user_id = "'+times.uid+'"';
    global.connect.query(sql,callback);
};

/**
 * 根据创建时间判断员工是否可以在当天重复操作数据
 * @param param 员工 查询参数 {uid,startTime,endTime}
 * @param callback 查询结束后回调函数
 */
exports.getWorkRecordByCreateTime = function(param,callback){
    var sql = 'SELECT * FROM work_summary WHERE user_id="'+ param.uid +'" AND create_time >= "'+param.startTime+'" AND create_time <="'+param.endTime+'"';
    global.connect.query(sql,callback);
};
/**
 * 首页通过createTime获取工作记录
 * @param params
 * @param callback
 */
exports.getWorkRecordByCreateTimeForIndex = function (params,callback) {
    var sql1 = 'SELECT * FROM work_summary WHERE create_time >= "'+params.startTime+'" AND create_time <="'+params.endTime+'" order by create_time desc';
    var sql2 = 'SELECT * FROM work_summary';
    global.connect.query(''+sql1+';'+sql2+'',callback);
};
/**
 * 通过userId查询用户
 * @param userId
 * @param callback
 */
exports.getUserByUserId = function (userId,callback) {
  var sql = 'SELECT * FROM users WHERE id='+userId+'';
    global.connect.query(sql,callback);
};
/**
 * 首页下拉选择时间查询工作记录
 * @param time 创建时间
 * @param callback
 */
exports.queryWorkRecord = function (params,callback) {
  var sql = 'SELECT * FROM work_summary WHERE create_time >= "'+params.startTime+'" AND create_time <="'+params.endTime+'" order by create_time desc';
  //var sql = 'SELECT * FROM work_summary WHERE create_time  LIKE "%'+time+'%" order by create_time desc';
    global.connect.query(sql,callback);
};
/**
 * 根据workID查询工作记录
 * @param workId
 * @param callback
 */
exports.getWorkRecordByWorkId = function (workId,callback) {
    var sql = 'SELECT * FROM work_summary WHERE id="'+workId+'"';
    global.connect.query(sql,callback);
};
/**
 * 更新工作记录
 * @param $param
 * @param callback
 */
exports.updateWorkReaord = function ($param,callback) {
    var sql = 'UPDATE  work_summary SET work_content="'+$param.workContent+'",self_score="'+$param.score+'" WHERE id='+$param.workId;
    global.connect.query(sql,callback);
};
/**
 * 人员评分
 * @param scoreFlag 评分标记
 * @param workId work_summary id
 * @param callback 执行完成时回调函数
 */
exports.updateEmployeeScore = function(scoreFlag,workId,callback){
    var sql = '';
    var zanSql = 'UPDATE work_summary SET zan_num=zan_num+1 WHERE id='+workId+'';
    var caiSql = 'UPDATE work_summary SET cai_num=cai_num+1 WHERE id='+workId+'';
    /**
     *  AND end_worktime is not null
     */

    var unzanSql = 'UPDATE work_summary SET zan_num=zan_num-1 WHERE id='+workId+'';
    var uncaiSql = 'UPDATE work_summary SET cai_num=cai_num-1 WHERE id='+workId+'';

    if(scoreFlag == 'zan') sql = zanSql;
    if(scoreFlag == 'cai') sql = caiSql;
    if(scoreFlag == 'unzan') sql = unzanSql;
    if(scoreFlag == 'uncai') sql = uncaiSql;

    global.connect.query(sql,callback);
};

/**
 * 通过userId修改评分用户状态
 */
exports.updateScoreStateByUserId = function (workId,userId,callback) {
    var sql = 'UPDATE users SET is_scores = is_scores+'+workId+','+' WHERE id='+userId+'';
    global.connect.query(sql,callback);
};

/**
 * 修改密码
 * @param passwd
 * @param uid
 * @param callback
 */
exports.updatePasswd = function (passwd,uid,callback) {
    var sql = 'UPDATE users SET passwd="'+passwd+'"  WHERE id='+uid+'';
    global.connect.query(sql,callback);
};

/**
 * 保存人员评分记录
 * @param workId
 * @param uid
 * @param callback
 */
exports.saveScoreRecord = function (socreStr,uid,workId,callback) {
    var sql = "UPDATE work_summary SET is_score = '"+socreStr+"' WHERE user_id="+uid+" AND id='"+workId+"'";
    global.connect.query(sql,callback);
};

/**
 * 通过userid查询工作记录
 * @param uid 用户ID
 * @param callback 回调函数
 */
exports.queryWorkRecordByUserid = function (uid, callback) {
    var sql = 'SELECT * FROM work_summary WHERE user_id = "'+uid+'"';
    global.connect.query(sql,callback);
};
/**
 * 通过workId和userId查询工作总结
 */
exports.queryWorkRecordByWorkAndUid = function(workId,uid,callback){
    var sql = 'SELECT * FROM work_summary WHERE id = "'+workId+'" AND user_id = "'+uid+'"';
    global.connect.query(sql,callback);
};
/**
 * 查询用户当天工作中数据
 */
exports.queryWorkRecordByWorkState = function ($work,callback) {
    var sql = 'SELECT * FROM work_summary WHERE create_time >= "'+$work.startTime+'" AND create_time <= "'+$work.endTime+'" AND user_id = "'+$work.uid+'" AND work_state=0';
    global.connect.query(sql,callback);
};
/**
 * 更新工作中记录
 */
exports.updateWorkingRecord = function (params,callback) {
    var sql = 'UPDATE work_summary SET work_content="'+params.content+'"  WHERE id="'+params.workId+'"';
    global.connect.query(sql,callback);
};
/**
 * 根据时间和用户ID查询工作记录
 */
exports.queryWorkRecordByUserIdAndDate = function(uid,params,callback){
    var sql = 'SELECT * FROM work_summary WHERE create_time >= "'+params.startTime+'" AND create_time <="'+params.endTime+'" AND user_id="'+uid+'"';
    global.connect.query(sql,callback);
};