/**
 * Created by Administrator on 2017/3/11.
 */
var eventproxy = require('eventproxy');
var tools = require('../common/tools');
var validator = require('validator');
var authMiddleWare = require('../common/auth');
var User = require('../models/admin.model.users');
var logger = require('log4js').getLogger("admin.users");
var config = require('../config');
var channel = require('../controllers/admin.home');


//ROOT path
exports.home = function (req,res,next) {
    res.redirect('/index');
};

//Login page
exports.showLogin = function (req,res,next) {
    res.render('login');
};

//register page
exports.showSignup = function (req,res,next) {
    res.render('register');
};

//logout
exports.signout = function (req,res,next) {
    req.session.destroy();
    res.clearCookie(config.auth_cookie_name, { path: '/' });
    res.redirect('/admin/signin');
};

//Login
exports.signin = function (req,res,next) {
    var uname = validator.trim(req.body.uname).toLowerCase();
    var passwd    = validator.trim(req.body.passwd);
    var remember  = req.body.remember;
    var ep        = new eventproxy();

    console.log(uname + ',' + passwd + ',' + remember);
    ep.fail(next);

    if (!uname || !passwd) {
        res.status(422);
        return res.render('login', { error: '请填写完整登录信息。' });
    }

    ep.on('login_error', function (login_error) {
        res.status(403);
        res.render('login', { error: '用户名或密码错误，请修正后重试' });
    });

    User.getUserByLoginName(uname, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user.length) {
            return ep.emit('login_error');
        }
        if (uname !== user[0].uname){
            return ep.emit('login_error');
        }

        var passhash = user[0].passwd;
        tools.bcompare(passwd, passhash, ep.done(function (bool) {
            if (!bool) {
                return ep.emit('login_error');
            }

            // 设置cookie
            authMiddleWare.gen_session(user, res);
            console.log('[LOG]=> cookie  '+JSON.stringify(req.cookies));
            console.log('[LOG]=> session  '+JSON.stringify(req.session));
            console.log(req.cookies);
            res.redirect('/admin');
        }));
    });
};

// register
exports.signup = function (req,res,next) {
    var loginname = validator.trim(req.body.uname);
    var email = validator.trim(req.body.email);
    var passwd      = validator.trim(req.body.passwd);
    var rePasswd    = validator.trim(req.body.re_pass);
    var nickName =  'sp-blog__'+Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)+'__';

    var ep = new eventproxy();
    ep.fail(next);
    ep.on('prop_err', function (msg) {
        res.status(422);
        res.render('register', {error: msg});
    });

    // 验证信息的正确性(判断数据是否为空)
    if ([loginname, passwd, rePasswd,email].some(function (item) { return item === ''; })) {
        ep.emit('prop_err', '请填写完整注册信息。');
        return;
    }
    if (loginname.length < 2) {
        ep.emit('prop_err', '用户名至少需要3个字符。');
        return;
    }
    if (!tools.validateId(loginname)) {
        return ep.emit('prop_err', '用户名不合法。');
    }

    if (!validator.isEmail(email)){
        return ep.emit('prop_err', '邮箱格式不正确');
    }

    if (passwd !== rePasswd) {
        return ep.emit('prop_err', '两次密码输入不一致。');
    }

    if (loginname.length > 11) {
        return ep.emit('prop_err', '登录名称过长');
    }
    // END 验证信息的正确性

    User.getUserByLoginName(loginname,function (err, users) {
        if (err) {
            return next(err);
        }
        logger.debug(users);
        if (users.length > 0) {
            ep.emit('prop_err', '用户名已被使用。');
            return;
        }

        tools.bhash(passwd, ep.done(function (passhash) {
            User.newAndSave(loginname,passhash,email,nickName,function (err) {
                if (err) {
                    return next(err);
                }
                //注册成功.
                res.render('success_page',{msg:'账号注册成功！',url:'/admin/signin'});
                console.log('注册成功.');
            });
        }));
    });
};