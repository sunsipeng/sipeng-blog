/**
 * Created by chancy on 2017/3/21.
 */

var channel = require('../models/admin.model.home');
var logger = require('log4js').getLogger("admin.controllers.home");
var moment = require('moment');

//index page
exports.renderHome = function (req,res,next) {
    channel.getChannelInfoAsAdmin(function(err,data){
        if (err) {
            logger.error(err);
            return next(err);
        }

        logger.info(data);

        return res.render('index', {
            title: '欢迎你!'
        });
    });
};

//home Content
exports.innerHome = function (req,res,next){
    res.render('homePage');
};

exports.addChannel = function (req,res,next) {
    var mo = moment();
    var channelName = req.body.channelName;
    var createTime =  mo.format('YYYY-MM-DD HH:mm:ss');

    channel.addChannelModel(channelName,createTime, function (err,data) {
        if (err) {
            logger.error(err);
            return next(err);
        }
        return res.send({
            status:200,
            result:{
                info:'添加栏目成功! '+JSON.stringify(data)
            }
        })
    });
};

exports.showAddChannel = function (req,res,next) {
    res.render('addChannel')
};

exports.serviceWorker = function (req,res,next) {
    res.render('worker');
};