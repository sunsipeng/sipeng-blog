/**
 * Created by chancy on 2017/4/26.
 */
var eventproxy = require('eventproxy');
var validator      = require('validator');
var config = require('../config');
var tools = require('../common/tools');
var logger = require('log4js').getLogger("work_controllers");
var furloughModel = require('../models/model_furlough');
var moment = require('moment');

//请假首页页面渲染
exports.showFurlough = function (req,res,next) {
    var admin = parseInt(req.session.user.is_admin);
    res.render('furlough',{admin:admin == 0 ? false : true});
};

//添加请假页面渲染
exports.showAddFurlough = function (req,res,next) {
    res.render('addFurlough',{
        types: config.FurloughTypes,
        startTime: config.workStartTime,
        endTime: config.offWorkTime
    });
};

//新增请假
exports.addFurlough = function (req,res,next) {
    var type = validator.trim(req.body.type);
    var start_time = validator.trim(req.body.start_time);
    var end_time = validator.trim(req.body.end_time);
    var days = validator.trim(req.body.days);
    var reason = validator.trim(req.body.reason);
    var uid = req.session.user.id;

    var ep = new eventproxy();
    ep.on('prop_err', function (msg) {
        res.status(422);
        res.render('addFurlough',{
            error: msg,
            types: config.FurloughTypes,
            startTime: config.workStartTime,
            endTime: config.offWorkTime
        });
    });

    if ([type,start_time,end_time,days,reason].some(function (item) { return item === ''; })) {
        ep.emit('prop_err', '请填写完整信息。');
        return false;
    }

    if (!validator.isFloat(days)) {
        ep.emit('prop_err','天数格式不正确.');
        return ;
    }

    if ((new Date(`2017-4-27 ${end_time}`) - new Date(`2017-4-27 ${start_time}`)) <= 0) {
        ep.emit('prop_err','结束时间不能小于开始时间。');
    }

    var $params = {
        uid: uid,
        type: type,
        start_time: start_time,
        end_time: end_time,
        days: days,
        reason: reason,
        create_time: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    furloughModel.addFurloughData($params, function (err,data) {
        if (err) {
            return next(err);
        }

        return res.render('success_page',{msg:'提交请假数据成功。',url:'/furlough'});
    });
};

//获取请假数据
exports.getFurloughAll = function (req,res,next) {
    var ep  = new eventproxy();
    var admin = parseInt(req.session.user.is_admin);
    var userId = req.session.user.id;

    //查询不包含 `拒绝` 的数据 is not null  and active<>2
    furloughModel.getFurloughAllData(admin == 0 ? `= ${userId}` : 'is not null ',function (err,result) {
        if (err) {
            return next(err);
        }

        ep.after('query_complete',result.length, function (userData) {
            result.forEach(function (data,index) {
                data.create_time = moment(data.create_time).format('YYYY-MM-DD HH:mm');
                data.userName = userData[index].reality_name;
                data.avatar = userData[index].avatar;
            });

            return res.send({
                success:'获取请假数据成功',
                furloughData: result
            });
        });

        for (var i = 0; i<result.length; i++) {
            furloughModel.getUserByUserId(result[i].uid, function (err,data) {
                if (err) {
                    next(err);
                }
                ep.emit('query_complete',data[0]);
            });
        }
    });
};

//审核
exports.auditFurlough = function (req,res,next) {
    var fid = validator.trim(req.body.fid);
    var flag = validator.trim(req.body.flag);

    var ep = new eventproxy();
    ep.on('prop_err', function (msg) {
        res.status(422);
        return res.send({
            error: msg
        });
    });

    if ([fid,flag].some(function (item) { return item === ''; })) {
        ep.emit('prop_err', '请填写完整信息。');
        return false;
    }
    //同意
    if (flag == 1) {
        furloughModel.auditFurloughData({active:1,fid:fid}, function (err,data) {
            if (err) {
                return next(err);
            }

            return res.send({
                success:'审核成功'
            });
        });
    //拒绝
    } else if (flag == 2){
        furloughModel.auditFurloughData({active:2,fid:fid}, function (err,data) {
            if (err) {
                return next(err);
            }
            return res.send({
                success:'审核成功'
            });
        });
    } else {
        return res.send({
            error:'参数错误!!'
        });
    }
};

exports.checkPending = function (req,res,next) {
    var ep = new eventproxy();

    furloughModel.queryCheckPendingData(function (err,result) {
        if (err) {
           return next(err);
        }

        ep.after('query_complete',result.length, function (userData) {
            result.forEach(function (data,index) {
                data.create_time = moment(data.create_time).format('YYYY-MM-DD HH:mm');
                data.userName = userData[index].reality_name;
                data.avatar = userData[index].avatar;
            });

            return res.send({
                success:'获取请假数据成功',
                furloughData: result
            });
        });

        for (var i = 0; i<result.length; i++) {
            furloughModel.getUserByUserId(result[i].uid, function (err,data) {
                if (err) {
                    next(err);
                }
                ep.emit('query_complete',data[0]);
            });
        }
    });
};

//请假数据分页
exports.furloughPaginationHandel = function (req,res,next) {
    var ep = new eventproxy();
    var admin = parseInt(req.session.user.is_admin);
    var userId = req.session.user.id;
    var pageNum = req.body.pageNum;

    //查询不包含 `拒绝` 的数据 is not null  and active<>2
    furloughModel.queryInvoiceByPageNumber(admin == 0 ? `= ${userId}` : 'is not null ',pageNum, function (err,data) {
        if (err) {
            logger.error('分页查询失败!');
            res.send({
                error: '查询失败，请稍后重试!'
            });
            return next(err);
        }

        var dataArray = [];
        dataArray = data;
        ep.after('query_complete',data.length, function (userData) {
            dataArray.forEach(function (data,index) {
                data.create_time = moment(data.create_time).format('YYYY-MM-DD HH:mm');
                data.userName = userData[index].reality_name;
                data.uname = userData[index].uname;
                data.avatar = userData[index].avatar;
            });

            return res.send({
                success: '查询成功!',
                furloughData: dataArray
            });
        });
        /**
         * 查询用户数据
         */
        for (var i = 0; i<data.length; i++) {
            furloughModel.getUserByUserId(data[i].uid, function (err,data) {
                if (err) {
                    return next(err);
                }
                ep.emit('query_complete',data[0]);
            });
        }
    });
};