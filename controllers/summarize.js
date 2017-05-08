/**
 * Created by chancy on 2017/2/15.
 * 汇总controllers
 */
var moment = require('moment');
var summarizeModel = require('../models/models_summarize');
var config = require('../config');
var eventproxy = require('eventproxy');
var logger = require('log4js').getLogger("summarize_controllers");
var tools = require('../common/tools');

/**
 * 昨日人员工作累加时间
 */
var yesterdayWorkTimeInfo = function (callback,next) {
    var mo = moment();
        mo.subtract(1, 'days');
    var nextDay = moment();
        //mo.subtract(2, 'days');
    var ep = new eventproxy();
    ep.fail(next);

    /**
     * 昨日暂无工作记录
     */
    ep.on('noWorkTime', function () {
        logger.debug('昨日暂无工作时间...');
        summarizeModel.queryAllWorkRecord(function (err,workRecord) {
            if (err) {
                return logger.error('查询所有工作记录失败!');
            }
            /**
             * 系统中暂无工作记录　|| 系统中工作记录只有一天的工作记录 则判定为没有昨日数据
             */
            var createTimeBackup = workRecord.slice(0);
            //格式化创建时间便于去重操作
            workRecord.forEach(function (_result) {
                   _result.create_time = moment(_result.create_time).format('YYYY-MM-DD');
            });
            var undelpCreateTime = tools.undulpicateCreateTime(workRecord);

            if (!createTimeBackup.length || undelpCreateTime.length <= 1) {
                logger.debug('系统中暂无工作记录');
                callback({
                    fail:'系统中暂无工作记录',
                    result:{
                        workTime: [],
                        userName: [],
                        workTimeTotal: [],
                        startTime: 'unknow',
                        endTime: 'unknow'
                    }
                });
            } else {
                //时间递减后继续查询
                logger.debug('时间递减继续查询');
                mo.subtract(1, 'days');
                nextDay.subtract(1, 'days');
                calcWorkTime();
            }
        });
    });

    function calcWorkTime(){
        summarizeModel.getAllUser(function (err,data) {
            if (err) {
                return logger.error('计算加班时间（定时任务） 查询用户 -失败!');
            }

            var params = {
                startTime: mo.format('YYYY-MM-DD') + ' '+config.workStartTime,
                endTime: nextDay.format('YYYY-MM-DD') + ' '+config.workStartTime
                //endTime:  moment().subtract(1,'days').format('YYYY-MM-DD') + ' '+config.workStartTime,
            };
            logger.debug('查询时间: ',params);
            ep.after('queryUsersWorkRecord',data.length, function (workRecord) {
                //剔除空数组
                for (var ff = 0; ff<workRecord.length; ff++) {
                    if (workRecord[ff].length == 0) {
                        workRecord.splice(ff,1);
                        ff--;
                    }
                }

                var workTimes = [];
                //提取工作时间并计算总时间
                for (var gg = 0; gg<workRecord.length; gg++) {
                    //计算工作效率
                    var workTimeCount = 0;
                    //原工作时间
                    var workTimeTotal = 0;
                    for (var oo = 0; oo<workRecord[gg].length; oo++) {
                        //工作时间 = 工作时长 *（工作效率/10）
                        //logger.warn(workRecord[gg][oo].self_score);
                        workTimeCount += workRecord[gg][oo].work_time*(workRecord[gg][oo].self_score/10);
                        workTimeTotal += workRecord[gg][oo].work_time;
                    }
                    workTimes.push({
                        uid: workRecord[gg][0].user_id,
                        workTime: workTimeCount.toFixed(1),
                        workTimeTotal: workTimeTotal.toFixed(1)
                    });
                }


                /**
                 * 查询真实姓名 结束
                 */
                ep.after('queryNameComplete', workTimes.length, function (userName) {
                    var workTime = [],
                        workTimeTotal = [];
                    workTimes.forEach(function (_data_) {
                        workTime.push(_data_.workTime);
                    });
                    workTimes.forEach(function (_data_) {
                        workTimeTotal.push(_data_.workTimeTotal);
                    });
                    logger.debug(workTime);
                    logger.debug(userName);

                    /**
                     * 昨日暂无工作记录 则计算前天工作时间。。。以此类推
                     */
                    if (workTime.length == 0) {
                       return ep.emit('noWorkTime');
                    }

                    callback({
                        success:'ok',
                        result:{
                            workTime: workTime,
                            userName: userName,
                            workTimeTotal: workTimeTotal,
                            startTime: moment(params.startTime).format('YYYY-MM-DD'),
                            endTime: moment(params.endTime).format('YYYY-MM-DD')
                        }
                    });
                });

                //查询真实姓名
                for (var nn = 0; nn<workTimes.length; nn++) {
                    summarizeModel.queryUserByUserId(workTimes[nn].uid, function (err,_data_) {
                        if (err) {
                            ep.emit('queryNameComplete','查询用户真实名姓名失败');
                            //res.send({
                            //    fail:'fail'
                            //});
                            logger.error('查询用户真实名姓名失败！！！');
                            return next(err);
                        }

                        ep.emit('queryNameComplete',_data_[0].reality_name);
                    });
                }
            });

            for (var ll = 0; ll<data.length; ll++) {
                summarizeModel.queryCurrentWorkRecord(params,data[ll].id,function(err,_data){
                    if (err) {
                        return next(err);
                    }

                    ep.emit('queryUsersWorkRecord',_data);
                });
            }
        });
    }
    calcWorkTime();
};

/**
 * 汇总主页面渲染
 */
exports.showSummarize = function (req,res,next) {
    yesterdayWorkTimeInfo(function (summData) {
        res.render('summarize',{
            result: summData
        });
    },next);
};

/**
 * 天总结
 */
exports.daySummarize = function () {
    var sMo = moment();
    var startTime = sMo.format('YYYY-MM-DD ')+config.workStartTime;
    var endTime = sMo.add(1,'days').format('YYYY-MM-DD ')+config.workStartTime;

    summarizeModel.queryCurrentData(startTime,endTime, function (err,data) {
       if (err) {
           console.error(err);
           return false;
       }

       console.log(data);
    });
};

/**
 * 月总结
 */
exports.monthSummarize = function(){

};

