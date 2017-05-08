/**
 * Created by chancy on 2017/2/6.
 * 工作总结 Controller
 */
var eventproxy = require('eventproxy');
var validator      = require('validator');
var moment = require('moment');
var workModels = require('../models/models_work');
var config = require('../config');
var tools = require('../common/tools');
var logger = require('log4js').getLogger("work_controllers");

//获取首页数据
exports.getHomeData = function (req,res,next) {
    var mo = moment();
    //断是否在零点到-九点之间
    var tempTime = mo.format('HH:mm'),
        time = 0,
        nextDay=0;
    if (tempTime >='00:00' && tempTime <= config.nextDayEndTime ) {
        logger.debug('零点查询');
        mo.subtract(1, 'days');
        time = mo.format('YYYY-MM-DD');
        nextDay = mo.add(1,'days');
    } else {
        logger.debug('正常查询');
        time = mo.format('YYYY-MM-DD');
        nextDay = mo.add(1,'days');
    }
    //var time =  mo.format('YYYY-MM-DD');
    //var nextDay = mo.add(1,'days');
    var userId = parseInt(req.session.user.id);

    var params = {
        startTime: time +' '+ config.workStartTime,
        endTime: nextDay.format('YYYY-MM-DD') +' '+ config.workStartTime,
    };

    var ep  = new eventproxy();
    workModels.getWorkRecordByCreateTimeForIndex(params, function (err,data) {
        if (err) {
            next(err);
        };
        //SESSION
        logger.info('[LOG]=> '+JSON.stringify(req.session.user));
        var dataArray = [];
            dataArray = data[0];
        //查询工作记录数据完成时触发
        ep.after('query_complete',data[0].length, function (userData) {
            dataArray.forEach(function (data,index) {
                data.start_worktime = moment(data.start_worktime).format('HH:mm');
                data.end_worktime = moment(data.end_worktime).format('HH:mm');
                data.userName = userData[index].reality_name;
                data.uname = userData[index].uname;
                data.isEdit = userData[index].uname == req.session.user.uname;
                data.planContent = data.work_content.split(config.workContentSplit)[0];
                data.completedContent = data.work_content.split(config.workContentSplit)[1];
                data.avatar = userData[index].avatar;
            });

            ep.emit('work_data_complete',dataArray,data);
        });

        //处理工作数据完成时触发
        ep.on('work_data_complete', function (dataArray,_data) {

            var scoresArray = [],userIsScores = [];
            //获取当天所有is_score字段数据（不为空）
            _data[0].forEach(function (result) {
                var $scores = JSON.parse(result.is_score);
                if ( $scores.length !== 0 ) {
                    scoresArray.push( $scores);
                }
            });

            for( var pp = 0; pp<scoresArray.length; pp++ ) {
                for ( var ii = 0; ii< scoresArray[pp].length; ii++ ) {
                    userIsScores.push({
                        wid: scoresArray[pp][ii].wId,
                        uid: scoresArray[pp][ii].uid
                    });
                }
            }

            for ( var s = 0; s<userIsScores.length; s++ ) {
                for ( var d = 0; d<dataArray.length; d++ ) {
                     if ( userIsScores[s].wid == dataArray[d].id && userIsScores[s].uid == userId ) {
                         dataArray[d].scored = true;
                     }
                }
            }

            /**
             * 只查询已完成工作总结
             */
            //var finishedData = [];
            //dataArray.forEach(function (data) {
            //    //if(data.work_state == 1) {
            //        finishedData.push(data);
            //    //}
            //});
            //logger.debug('==='+JSON.stringify(finishedData));

            var dateArray = [];
            _data[1].forEach(function (data) {
                data.create_time = moment(data.create_time).format('YYYY-MM-DD');
                dateArray.push(data.create_time);
            });
            //时间去重
            dateArray.push(moment().format('YYYY-MM-DD'));
            var newDateArray = tools.undulpicate(dateArray);

            return res.send({
                success: '获取首页数据成功.',
                result: {
                    name: req.session.user.reality_name,
                    title: '欢迎你!',
                    is_admin: req.session.user.is_admin,
                    dataArray: dataArray,
                    dateArray: newDateArray
                }
            });
        });

        /**
         * 获取用户信息
         */
        for (var i = 0; i<data[0].length; i++) {
            workModels.getUserByUserId(data[0][i].user_id, function (err,data) {
                if (err) {
                    next(err);
                }
                ep.emit('query_complete',data[0]);
            });
        }

        /**
         * 今日暂无数据（只处理时间）
         */
        if (data[0].length == 0) {
            logger.debug('今日暂无数据');
            var dateArray = [];
            data[1].forEach(function (data) {
                data.create_time = moment(data.create_time).format('YYYY-MM-DD');
                dateArray.push(data.create_time);
            });
            //时间去重
            dateArray.push(moment().format('YYYY-MM-DD'));
            var newDateArray = tools.undulpicate(dateArray);

            return res.send({
                success: '获取首页数据成功.',
                result: {
                    name: req.session.user.reality_name,
                    title: '欢迎你!',
                    is_admin: req.session.user.is_admin,
                    dateArray: newDateArray,
                    dataArray: []
                }
            });
        }
    });
};

/**
 * 通过work_state获取首页数据
 */
exports.getHomeDataByState = function (req,res,next) {
    var times = tools.calcParams();
    var $work = {
        uid : req.session.user.id,
        startTime: times.startTime,
        endTime: times.endTime
    };

    logger.debug($work);

    workModels.queryWorkRecordByWorkState($work, function (err,data) {
        if (err) {
            return next(err);
        }

        logger.debug('共查出 '+data.length+' 条工作中数据');
        if (data.length == 0) {
            return res.render('working',{
                dataArray: []
            });
        }

        data[0].start_worktime = moment(data[0].start_worktime).format('YYYY-MM-DD HH:mm:ss');
        data[0].uname = req.session.user.uname;
        res.render('working',{
           dataArray: data
        });
    });
};
/**
 * 提交工作总结（完成）
 */
exports.getCompletedWork = function(req,res,next){
    var wid = req.query.wid;
    var uname = req.query.uname;

    if(validator.isEmpty(wid)){
        res.render('working',{
            error: '请填写完整信息.'
        });
    }

    logger.debug(wid);
    workModels.getWorkRecordByWorkId(wid, function (err,data) {
       if (err) {
           return next(err);
       }
       if (data.length == 0) {
           return res.render('error_page',{error:'该工作记录已被删除!', url:'/index'});
       }

       data[0].uname = uname;
       data[0].start_worktime = moment(data[0].start_worktime).format('YYYY-MM-DD HH:mm:SS');
       res.render('finish_work',{
           workPlan: data[0]
       });
    });
};

//渲染首页
exports.renderHome = function (req,res,next) {
    return res.render('home', { name:req.session.user.reality_name,
        title: '欢迎你!',
        is_admin: req.session.user.is_admin
    });
};

//ROOT
exports.home = function (req,res,next) {
    //console.log('[LOG]=> cookie  '+JSON.stringify(req.headers.cookie));
    //console.log('[LOG]=> session  '+JSON.stringify(req.session));
    res.redirect('/index');
};

//新增工作内容页面
exports.addWorkPage = function (req,res,next) {
    var times = tools.calcParams();
    var $work = {
        uid : req.session.user.id,
        startTime: times.startTime,
        endTime: times.endTime
    };

    logger.debug($work);
    workModels.queryUserCurrentDayWorkRecord($work,function(err,data){
       if (err) {
           return next(err);
       }

       if (data.length == 0) {
           logger.debug('该员工暂无数据添加.');
           return res.render('add_work',{state:0,reqUrl:'/addWork'});
       }

       for (var i = 0; i<data.length; i++) {
           if (data[i].work_state == 0) {
               logger.debug('该员工 工作状态为工作中.');
               return res.redirect('/getIndexDataByWorkState');
               //return res.render('add_work',{state:1,reqUrl:'/addWorkComplete'});
               //break;
           }
       }
       logger.debug("数据不为空 -- 均为工作完成状态 .");
       return res.render('add_work',{state:0,reqUrl:'/addWork'});
    });
};

//创建工作计划(开始任务)
exports.addWorkHandle = function (req,res,next) {
    var workContent = validator.trim(req.body.workContent);
    var ep  = new eventproxy();

    ep.fail(next);

    ep.on('prop_err', function (msg) {
        res.status(422);
        res.render('add_work', {error: msg});
    });

    // 验证信息的正确性(判断数据是否为空)
    if ([workContent].some(function (item) { return item === ''; })) {
        ep.emit('prop_err', '请填写完整信息。');
        return;
    }

    /**
     * 数据插入前先判断一下work_state值是否为0
     * 0：工作中
     * 1：已完成
     */

    var $work = {
        uid: req.session.user.id,
        startTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        workContent: workContent,
        createTime: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    workModels.addWorkRecord($work, function (err,data) {
        if (err) {
            return next(err);
        }

        //添加工作总结成功.
        res.render('success_page',{msg:'添加工作总结成功！',url:'/index'});
        logger.info('添加工作总结成功.' + JSON.stringify(data));
    });
};

/**
 * 添加工作总结(已完成)
 */
exports.addWorkComplete = function (req,res,next) {
    var endWorkContent = validator.trim(req.body.workContent),
        score = req.body.score,
        endTime = moment().format('YYYY-MM-DD HH:mm:ss'),
        workId = req.body.workId,
        planWorkContent = validator.trim(req.body.planWorkContent),
        plan_startTime = validator.trim(req.body.plan_startTime),
        old_plan_workContent = validator.trim(req.body.old_plan_workContent);
    var ep  = new eventproxy();
    ep.fail(next);

    ep.on('prop_err', function (msg) {
        res.status(422);
        res.render('finish_work',{
            error: msg,
            workPlan: {
                start_worktime: plan_startTime,
                work_content: old_plan_workContent
            }
        });
    });

    // 验证信息的正确性(判断数据是否为空)
    if ([endWorkContent,planWorkContent,score,workId].some(function (item) { return item === ''; })) {
        ep.emit('prop_err', '请填写完整信息。');
        return false;
    }

    //评分判断
    if (score > 10 || score < 0 ) {
        ep.emit('prop_err', '评分范围不正确.');
        return false;
    }
    logger.debug('评分： ' + validator.isNumeric(score));
    if (!validator.isNumeric(score)) {
        ep.emit('prop_err','评分或格式不正确.');
        return ;
    }

    var $workParams = {
        score: score,
        endTime: endTime,
        workTime: '',// 工作时长
        workContent: planWorkContent + config.workContentSplit + endWorkContent,
        id: workId
    };

    workModels.getWorkRecordByWorkId(workId, function (err,data) {
        if (err) {
            return next(err);
        }
        $workParams.workTime = tools.calcTimePoor(data[0].start_worktime,endTime,false);
        logger.debug('加班时间   ' + $workParams.workTime );
        workModels.addWorkCompleted($workParams, function (err,data) {
            if (err) {
                return next(err);
            }

            res.render('success_page',{msg:'提交工作总结成功（已完成）！',url:'/index'});
            logger.debug('数据提交成功!' + JSON.stringify(data));
            logger.debug(endWorkContent +'   '+ score+'  '+ endTime);
        });
    });

};

/**
 * 根据创建时间查询工作记录
 */
exports.queryWorkRecordByTime = function (req,res,next) {
    var time = req.body.queryTime;
    var userId = parseInt(req.session.user.id);
    var nextDay = moment(time).add(1,'days');
    var ep  = new eventproxy();

    if (validator.isEmpty(time)){
        return res.send({error:'时间不能为空'});
    }
    var params = {
        startTime: time +' '+ config.workStartTime,
        endTime: nextDay.format('YYYY-MM-DD') +' '+ config.nextDayEndTime,
    };

    workModels.queryWorkRecord(params,function(err,data){
        if (err) {
            logger.error('根据创建时间查询工作记录--ERROR');
            return next(err);
        }
        var dataArray = data;
        ep.after('query_complete',data.length, function (userData) {
            dataArray.forEach(function (data,index) {
                data.start_worktime = moment(data.start_worktime).format('HH:mm');
                data.end_worktime = moment(data.end_worktime).format('HH:mm');
                data.userName = userData[index].reality_name;
                data.uname = userData[index].uname;
                data.isEdit = userData[index].uname == req.session.user.uname;
                data.planContent = data.work_content.split(config.workContentSplit)[0];
                data.completedContent = data.work_content.split(config.workContentSplit)[1];
                data.avatar = userData[index].avatar;
            });

            ep.emit('work_data_complete',dataArray);
        });

        //处理工作数据完成时触发
        ep.on('work_data_complete', function (dataArray) {

            var scoresArray = [],userIsScores = [];
            //获取当天所有is_score字段数据（不为空）
            dataArray.forEach(function (result) {
                var $scores = JSON.parse(result.is_score);
                if ( $scores.length !== 0 ) {
                    scoresArray.push( $scores);
                }
            });

            for( var pp = 0; pp<scoresArray.length; pp++ ) {
                for ( var ii = 0; ii< scoresArray[pp].length; ii++ ) {
                    userIsScores.push({
                        wid: scoresArray[pp][ii].wId,
                        uid: scoresArray[pp][ii].uid
                    });
                }
            }

            for ( var s = 0; s<userIsScores.length; s++ ) {
                for ( var d = 0; d<dataArray.length; d++ ) {
                    if ( userIsScores[s].wid == dataArray[d].id && userIsScores[s].uid == userId ) {
                        dataArray[d].scored = true;
                    }
                }
            }
            /**
             * 只查询已完成工作总结
             */
            var finishedData = [];
            dataArray.forEach(function (data) {
                //if(data.work_state == 1) {
                    finishedData.push(data);
                //}
            });
            return res.send({
                success: '根据时间查询数据成功.',
                result: {
                    name: req.session.user.reality_name,
                    title: '欢迎你!',
                    is_admin: req.session.user.is_admin,
                    dataArray: finishedData,
                }
            });
        });

        /**
         * 查询用户
         */
        for (var i = 0; i<data.length; i++) {
            workModels.getUserByUserId(data[i].user_id, function (err,data) {
                if (err) {
                    next(err);
                }
                //logger.info(data);
                ep.emit('query_complete',data[0]);
            });
        }

        if (dataArray.length == 0) {
            return res.send({
                success: '今日暂无工作记录.',
                result: {
                    name: req.session.user.reality_name,
                    title: '欢迎你!',
                    is_admin: req.session.user.is_admin,
                    dataArray: []
                }
            });
        }
    });
};

//工作总结编辑（渲染页面）
exports.showEdit = function (req,res,next) {
    logger.debug('URL '+req.url);
    var workId = validator.trim(req.query.workId);
    var uname = validator.trim(req.query.uname);
    workModels.getWorkRecordByWorkId(workId, function (err,data) {
        if (err) {
            next(err);
        }

        logger.debug(data);
        if (data.length == 0) {
            return res.render('error_page',{error:'该工作记录已被删除!', url:'/index'});
        }
        data.forEach(function (data) {
            data.start_worktime = moment(data.start_worktime).format('YYYY-MM-DD HH:mm');
            data.end_worktime = moment(data.end_worktime).format('YYYY-MM-DD HH:mm');
        });

        logger.info(data);
        data[0].workId = workId;
        data[0].uname = uname;
        return res.render('edit_work', {
            editData: data[0],
            split: config.workContentSplit
        });
    });
};

//提交编辑后的工作记录
exports.editWorkRecord = function (req,res,next) {
    var planContent = validator.trim(req.body.planContent);
    var completedContent = validator.trim(req.body.completedContent);
    var score = req.body.score;
    var workId = validator.trim(req.body.workId);
    var uname = validator.trim(req.body.uname);
    var ep = new eventproxy();

    ep.on('prop_err', function (msg) {
        res.status(422);
        res.render('edit_work', {
            error: msg,
            editData: {
                work_content: '',
                self_score: '',
                invoice_money: '',
                workId: workId,
                uname: uname
            }
        });
    });

    // 验证信息的正确性(判断数据是否为空)
    if ([planContent,completedContent,score].some(function (item) { return item === ''; })) {
        ep.emit('prop_err', '请填写完整信息。');
        return;
    }

    //评分判断
    if (score > 10 || score < 0 ) {
        ep.emit('prop_err', '评分范围不正确.');
        return;
    };

    logger.debug('评分： ' + validator.isNumeric(score));
    if (!validator.isNumeric(score)) {
        ep.emit('prop_err','评分或格式不正确.');
        return ;
    }

    //更新参数
    var $updateParam = {
        workContent: planContent+config.workContentSplit+completedContent,
        score: score,
        workId: workId,
        uname: uname,
    };

    workModels.updateWorkReaord($updateParam, function (err,data) {
        if (err) {
           return next(err);
        }
        //更新工作总结成功
        res.render('success_page',{msg:'修改工作总结成功！',url:'/index'});
    });
};
/**
 * 工作记录（工作中） 编辑
 */
exports.editWorkRecordByWorking = function (req,res,next) {
    var content = validator.trim(req.body.content);
    var workId = validator.trim(req.body.workId);
    var uname = validator.trim(req.body.uname);
    var ep = new eventproxy();

    ep.on('prop_err', function (msg) {
        res.status(422);
       res.send({
           error: msg
       });
    });

    if ([content, workId, uname].some(function (item) { return item === ''; })) {
        return ep.emit('prop_err', '请填写完整信息。');
    }

    var params = {
        content: content,
        workId: workId
    };

    workModels.updateWorkingRecord(params,function(err,data){
       if (err) {
           logger.error('工作记录（工作中） 编辑 -- 失败！');
           return next(err);
       }

        res.send({
            success: '更新成功!'
        });
    });
};

/**
 * 人员评分
 */
exports.employeeScore = function (req,res,next) {
    /**
     * scoreFlag : 1. zan 点赞
     *             2. cai 点踩
     *             3. unzan 取消赞
     *             4. uncai 取消踩
     */
    var score = validator.trim(req.body.scoreFlag);
    var workId = req.body.workId;
    var uid = req.session.user.id;
    var scoreId  = req.body.scoreId;

    logger.debug('评分标记: ' + score + '   == scored id === ' + scoreId +' ==workId ' + workId);

    var ep = new eventproxy();
    ep.on('prop_err', function (msg) {
        return res.send({
            error: msg
        });
    });

    //更新评分成功
    ep.on('updated_score',function(){
        logger.debug('updated_score'+uid);
        //保存人员评分纪录
        workModels.queryWorkRecordByWorkAndUid(workId,scoreId,function(err,data){
            if (err) {
                return next(err);
            }

            logger.debug(data);
            var scoredArr = JSON.parse(data[0].is_score);
            logger.info('is_scoreArr  ');
            logger.info(scoredArr);
            scoredArr.push({
                uid: uid,
                wId: workId, //workId changed wId
            });
            var workIdStr = JSON.stringify(scoredArr);
            logger.info('workIdString ' + workIdStr);
            workModels.saveScoreRecord(workIdStr,scoreId, workId,function (err,data) {
                if (err) {
                    return next(err);
                }
                return res.send({
                    success: '评分成功!'
                });
            });
        });
    });

    logger.info('评分： ' +score+' workId' + workId);
    if (validator.isEmpty(score) || validator.isEmpty(workId)) {
         return ep.emit('prop_err','请填写完整信息');
    }

    workModels.updateEmployeeScore(score,workId, function (err,data) {
        if (err) {
            return next(err);
        }

        ep.emit('updated_score');
        logger.info(req.session.user.uname + ' 评分成功');
        logger.info(JSON.stringify(req.session.user));
        logger.info(data);
    });
};
/**
 * 根据用户ID查询工作记录
 */
exports.queryWorkRecordByUserId = function (req,res,next) {
    var uid = req.body.uid;
    var date = req.body.date;
    var userName = req.body.userName;
    var ep = new eventproxy();
    var userId = parseInt(req.session.user.id);
    var nextDay = moment(date).add(1,'days');
    var params = {
        startTime: date +' '+ config.workStartTime,
        endTime: nextDay.format('YYYY-MM-DD') +' '+ config.nextDayEndTime
    };
    ep.on('prop_err', function (msg) {
        res.status(422);
        return res.send({
            error: msg
        });
    });

    if ([uid, date, userName].some(function (item) { return item === ''; })) {
        return ep.emit('prop_err', '请填写完整信息。');
    }

    logger.debug(uid,+'    '+date);

    workModels.queryWorkRecordByUserIdAndDate(uid,params, function (err,data) {
       if (err) {
           logger.error('根据用户ID查询工作记录 失败!');
           return next(err);
       }
       var dataArray = [];
           dataArray = data;
       //查询工作记录数据完成时触发
       ep.after('query_complete',data.length, function (userData) {
            dataArray.forEach(function (data,index) {
                data.start_worktime = moment(data.start_worktime).format('HH:mm');
                data.end_worktime = moment(data.end_worktime).format('HH:mm');
                data.userName = userData[index].reality_name;
                data.uname = userData[index].uname;
                data.isEdit = userData[index].uname == req.session.user.uname;
                data.planContent = data.work_content.split(config.workContentSplit)[0];
                data.completedContent = data.work_content.split(config.workContentSplit)[1];
                data.avatar = userData[index].avatar;
            });

            ep.emit('work_data_complete',dataArray,data);
       });

       ep.on('work_data_complete', function (dataArray,_data) {

            var scoresArray = [],userIsScores = [];
            //获取当天所有is_score字段数据（不为空）
            _data.forEach(function (result) {
                var $scores = JSON.parse(result.is_score);
                if ( $scores.length !== 0 ) {
                    scoresArray.push($scores);
                }
            });

            for( var pp = 0; pp<scoresArray.length; pp++ ) {
                for ( var ii = 0; ii< scoresArray[pp].length; ii++ ) {
                    userIsScores.push({
                        wid: scoresArray[pp][ii].wId,
                        uid: scoresArray[pp][ii].uid
                    });
                }
            }

            for ( var s = 0; s<userIsScores.length; s++ ) {
                for ( var d = 0; d<dataArray.length; d++ ) {
                    if ( userIsScores[s].wid == dataArray[d].id && userIsScores[s].uid == userId ) {
                        dataArray[d].scored = true;
                    }
                }
            }

            return res.send({
                success: '获取 '+userName+' 工作记录成功.',
                result: {
                    name: req.session.user.reality_name,
                    title: '欢迎你!',
                    is_admin: req.session.user.is_admin,
                    dataArray: dataArray
                }
            });
       });

       for (var i = 0; i<data.length; i++) {
            workModels.getUserByUserId(data[i].user_id, function (err,data) {
                if (err) {
                    next(err);
                }
                //logger.info(data);
                ep.emit('query_complete',data[0]);
            });
       }
    });
};

/**
 * 修改密码（页面渲染）
 */
exports.showModifyPasswd = function(req,res,next){
    res.render('modify_passwd');
};
/**
 * 修改密码（处理）
 */
exports.modifyPasswdHandle = function(req,res,next){
    var protPwd =  validator.trim(req.body.protPwd);
    var newPwd =  validator.trim(req.body.newPwd);
    var confirmPwd =  validator.trim(req.body.confirmPwd);
    var uid = req.session.user.id;

    logger.debug(protPwd + '  ' + newPwd +'  ' +confirmPwd);
    var ep = new eventproxy();
    ep.fail(next);

    ep.on('prop_err', function (msg) {
        res.status(422);
        res.render('modify_passwd', {error: msg});
    });

    // 验证信息的正确性(判断数据是否为空)
    if ([protPwd, newPwd, confirmPwd].some(function (item) { return item === ''; })) {
        return ep.emit('prop_err', '请填写完整信息。');
    }

    if (newPwd !== confirmPwd) {
        return  ep.emit('prop_err', '两次密码不相同。');
    }


    workModels.getUserByUserId(uid,function(err,data){
        if (err) {
            return next(err);
        }
        logger.debug(data[0].passwd);
        var passhash = data[0].passwd;
        tools.bcompare(protPwd, passhash, ep.done(function (bool) {
            if (!bool) {
                return ep.emit('prop_err','原密码不正确');
            }

            tools.bhash(newPwd, ep.done(function (passhash) {
                //修改密码
                workModels.updatePasswd(passhash, uid,function (err,data) {
                    if (err) {
                        return next();
                    }
                    //清空session
                    req.session.destroy();
                    res.clearCookie(config.auth_cookie_name, { path: '/' });

                    logger.debug('修改成功.'+JSON.stringify(data));
                    return res.render('success_page',{msg:'密码成功！',url:'/signin'});
                });
            }));
        }));
    });
};
