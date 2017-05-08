/**
 * Created by chancy on 2017/2/24.
 * 定时任务 controllers
 */

var eventproxy = require('eventproxy');
var moment = require('moment');
var config = require('../config');
var tools = require('../common/tools');
var logger = require('log4js').getLogger("timerTask_controlllers");
var timerModels = require('../models/timerTask');
var workModels = require('../models/models_work');


/**
 * 计算加班时间（定时任务）
 */
var calcUserOverTime = function () {
    var mo = moment();
    mo.subtract(1, 'days');
    var ep = new eventproxy();


    timerModels.getAllUser(function (err,data) {
        if (err) {
            return logger.error('计算加班时间（定时任务） 查询用户 -失败!');
        }

        var params = {
            startTime: mo.format('YYYY-MM-DD') + ' '+config.workStartTime,
            endTime:  moment().format('YYYY-MM-DD') + ' '+config.nextDayEndTime,
        };

        ep.after('queryUsersWorkRecord',data.length, function (workRecord) {

            //剔除空数组
            for (var ff = 0; ff<workRecord.length; ff++) {
                if (workRecord[ff].length == 0) {
                    workRecord.splice(ff,1);
                    ff--;
                }
            }

            var workTimes = [];
            //提取加班时间
            for (var gg = 0; gg<workRecord.length; gg++) {
                var wotkTimeCount = 0;
                for (var oo = 0; oo<workRecord[gg].length; oo++) {
                    wotkTimeCount += workRecord[gg][oo].work_time;
                }
                //logger.info('uid '+workRecord[gg][0].user_id+' '+wotkTimeCount);
                workTimes.push({
                    uid: workRecord[gg][0].user_id,
                    workTime: wotkTimeCount
                });
            }

            //计算加班时间
            workTimes.forEach(function (times) {
                times.overtime = times.workTime - config.workTime < 0 ? 0 : (times.workTime - config.workTime).toFixed(1);
            });


            ep.after('changeOvertimeComplete',workTimes.length, function (_data) {
                logger.debug('更新加班时间完成!');
                logger.debug(_data);
            });

            //更新加班时间
            for (var ld = 0; ld<workTimes.length; ld++) {
                params.overtime = workTimes[ld].overtime;
                params.uid = workTimes[ld].uid;
                timerModels.updateOverTimeByUserId(params, function (err,data) {
                    if (err) {
                        return logger.error('计算加班时间出错（定时任务）!');
                    }

                    ep.emit('changeOvertimeComplete',data);
                });
            }

            //logger.info(workTimes);
        });

        for (var ll = 0; ll<data.length; ll++) {
            timerModels.queryCurrentWorkRecord(params,data[ll].id,function(err,_data){
                if (err) {
                    return next(err);
                }

                //if(_data.length == 0) return logger.debug('今日暂无工作记录( 计算加班定时任务 )!');

                ep.emit('queryUsersWorkRecord',_data);
            });
        }
    });
};


/**
 * 自动结算工作中记录（定时任务）
 */
exports.timerWorkRecoed = function(){

    var ep = new eventproxy();
    var mo = moment();
        mo.subtract(1, 'days');
    var endTimer = mo.format('YYYY-MM-DD') + ' 18:30';

    ep.on('queryYesterdayComplete', function (workingData) {
        var $workParams = {
            score: 5,
            endTime: endTimer,
            workTime: '',// 工作时长
            workContent: '',
        };

        ep.after('addWorkCompleted',workingData.length, function (id) {
            logger.debug('自动结算工作中记录  完成......');
            logger.debug('workId   '+JSON.stringify(id));

            //计算加班时间
            calcUserOverTime();
        });

        for (var ii = 0; ii<workingData.length; ii++) {
            $workParams.workTime = tools.calcTimePoor(workingData[ii].start_worktime,$workParams.endTime);
            $workParams.workContent = workingData[ii].work_content + config.workContentSplit + config.sysAutoWorkSummary;
            $workParams.id = workingData[ii].id;

            workModels.addWorkCompleted($workParams, function (err,data) {
                if (err) {
                    return logger.error('自动结算工作中记录（定时任务） 失败!');
                }

                ep.emit('addWorkCompleted', $workParams.id);
            });
        }
    });

    var params = {
        startTime: mo.format('YYYY-MM-DD') + ' '+config.workStartTime,
        endTime:  moment().format('YYYY-MM-DD') + ' '+config.nextDayEndTime,
    };

    timerModels.queryYesterdayWorkingRecord(params, function (err,data) {
        if (err) {
            return logger.error('自动结算工作中记录（定时任务） 失败！');
        }

        //logger.debug(data);
        logger.debug('结算时间：'+endTimer);
        ep.emit('queryYesterdayComplete',data);
    });
};

/**
 * 解决mysql无活动8小时后自动断开连接
 */
exports.autoQuery = function () {
    timerModels.autoQueryData(function (err,data) {
        if (err) {
            return logger.error('解决mysql无活动8小时后自动断开连接 查询失败!');
        }

        logger.debug('定时查询中...');
    });
};