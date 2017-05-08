/**
 * Created by chancy on 2017/2/5.
 * 授权
 */
var config = require('../config');
var eventproxy = require('eventproxy');
var User = require('../models/user');
var work = require('../models/models_work');
var moment = require('moment');
var logger = require('log4js').getLogger("auth");
var validator = require('validator');
var tools =  require('../common/tools');

function gen_session(user, res) {
    var auth_token = user[0].id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
    var opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        signed: true,
        httpOnly: true
    };
    res.cookie(config.auth_cookie_name, auth_token, opts); //cookie 有效期30天
}

exports.gen_session = gen_session;

/**
 * 需要管理员权限
 */
exports.adminRequired = function (req, res, next) {
    if (!req.session || !req.session.user || !req.session.user.id || (req.headers.cookie.indexOf(config.auth_cookie_name) < 0)) {
        return res.render('error_page',{error:'您当前暂未登录，请登录后继续完成操作.', url:'/signin'});
    }

    if (req.session.user.is_admin.indexOf('1') <0) {
        return res.render('error_page', { error: '需要管理员权限。' ,url: '/signin'});
    }

    next();
};

/**
 * 需要登录权限
 */
exports.userRequired = function (req, res, next) {
    if (!req.session || !req.session.user || !req.session.user.id || (req.headers.cookie.indexOf(config.auth_cookie_name) < 0)) {
        logger.debug('  您当前暂未登录，请登录后继续完成操作');
        return res.render('error_page',{error:'您当前暂未登录，请登录后继续完成操作.', url:'/signin'});
    }
    logger.info('cookie=' + JSON.stringify(req.headers.cookie));
    logger.info('session=' + JSON.stringify(req.session));
    next();
};

/**
 * ajax提交登录判断
 */
exports.userRequiredAjax = function (req,res,next) {
    if (!req.session || !req.session.user || !req.session.user.id || (req.headers.cookie.indexOf(config.auth_cookie_name) < 0)) {
        logger.debug('  您当前暂未登录，请登录后继续完成操作');
        return res.send({
            error:'您当前暂未登录，请登录后继续完成操作.'
        });
    }

    next();
};

/**
 * 验证用户是否登录
 * 设置SESSION
 */
exports.authUser = function (req,res,next) {

    var ep = new eventproxy();
    ep.fail(next);

    ep.all('get_user', function (user) {
        if (!user) {
            return next();
        }
        //is admin
        var userModel = user[0];

        req.session.user = userModel;
        //设置已评论文章数组
        //req.session.user.workIdArr = [];
        next();
    });

    if (req.session.user) {
        var sessionArray = [];sessionArray.push(req.session.user);
        ep.emit('get_user', sessionArray);
    } else {
        var auth_token = req.signedCookies[config.auth_cookie_name];
        if (!auth_token) {
            return next();
        }

        var auth = auth_token.split('$$$$');
        var user_id = auth[0];
        logger.info('USER_ID: ' + user_id);
        User.getUserById(user_id, ep.done('get_user'));
    }
};

/**
 * 判断是否在有效时间范围内
 */
function calcParams(req) {
    var mo = moment();
    var time =  mo.format('YYYY-MM-DD');
    var nextDay = mo.add(1,'days');
    var params = {
        uid: req.session.user.id,
        startTime: time +' '+ config.workStartTime,
        endTime: nextDay.format('YYYY-MM-DD') +' '+ config.nextDayEndTime,
    };

    logger.warn(params);
    return params;
}

exports.timeouts = {
    addTimeOuts: function (req,res,next) {
        var params = calcParams(req);
        //根据时间create time 查询工作数据
        work.getWorkRecordByCreateTime(params,function(err,data){
            if (err) {
                console.log('[ERROR LOG]=>'+JSON.stringify(err));
                return next(err);
            }

            if (data.length){
                return res.render('error_page',{error:'不能在当天完成重复的操作!', url:'/index'});
            } else {
                next();
            }
        });
    },
    scoreTimeOuts: function (req,res,next) {
        /**
         * 思路： 获取数据创建时间，获取当前时间
         *       用当前时间 - 数据创建时间 > 24小时 ? 隔天操作 : 当天操作 （ 废弃 ）
         *
         *       小于当天上午工作时间则为隔天否则为当天
         */
        var currentDate = moment().format('YYYY-MM-DD');
        var currentTime = new Date(''+currentDate+','+config.nextDayEndTime+'').getTime();
        var createTime = req.query.createTime;

        //var leftTime = currentTime - createTime;
        //var leftsecond = parseInt(leftTime/1000);
        //var hours = (leftsecond/(60*60)).toFixed(1);
        //
        //logger.debug('相隔时间： '+ hours);

        if (createTime < currentTime) {
            return res.render('error_page',{error:'只能在当天完成该操作!', url:'/index'});
        } else {
            next();
        }
    },
    _scoreTimeOuts: function (req,res,next) {
        var currentDate = moment().format('YYYY-MM-DD');
        var currentTime = new Date(''+currentDate+','+config.nextDayEndTime+'').getTime();
        var createTime = req.body.createTime;

        //var leftTime = currentTime - createTime;
        //var leftsecond = parseInt(leftTime/1000);
        //var hours = (leftsecond/(60*60)).toFixed(1);
        //
        //logger.debug('相隔时间： '+ hours);

        logger.debug('createTime  '+createTime+'  currentTime  '+currentTime);
        if (createTime < currentTime) {
            return res.send({
                error: '只能在当天完成该操作!'
            });
        } else {
            next();
        }
    }
};
/**
 * 判断用户是否为同一用户
 * @param req
 * @param res
 * @param next
 */
exports.nameEqualSessionName = function (req,res,next) {
    logger.debug(req.body.uname);
    var uname = validator.trim(req.body.uname);
    logger.info('SESSION NAME: '+req.session.user.uname);
    if (uname === req.session.user.uname) {
        next();
    } else {
        logger.error('body NAME   '+req.body.uname+'   SESSION NAME '+req.session.user.uname+'  不允许篡改他人工作记录!');
        return res.render('error_page',{error:'不允许篡改他人工作记录!', url:'/index'});
    }
};
/**
 * 判断是否为不同用户
 * @returns {String|*}
 */
exports.nameNotEqualSessionName = function (req,res,next) {
    logger.info(req.body.uname);
    var uname = validator.trim(req.body.uname);
    logger.info('SESSION NAME: '+req.session.user.uname);
    if (uname === req.session.user.uname) {
        return res.send({error:'不允许为自己评分!', url:'/index'});
    } else {
        next();
    }
};

