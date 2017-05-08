/**
 * Created by chancy on 2017/2/15.
 */
var invoiceModels = require('../models/models_invoice');
var eventproxy = require('eventproxy');
var moment = require('moment');
var tools = require('../common/tools');
var logger = require('log4js').getLogger("invoices_controlllers");
var config = require('../config');
var validator = require('validator');
var workModels = require('../models/models_work');

/**
 * 发票页面
 */
exports.showInvoice = function (req,res,next) {
    var admin = parseInt(req.session.user.is_admin);
    res.render('invoice',{admin:admin == 0 ? false : true});
};
/**
 * 新增发票页面渲染
 */
exports.showAddInvoice = function (req,res,next) {
    res.render('add_invoice');
};

/**
 * 提交发票信息
 */
exports.submitInvoiceInfo = function (req,res,next) {
    var invoice_money = req.body.invoice_money;
    var invoice_remarks = req.body.invoice_remarks;
    var uid = req.session.user.id;
    var create_time = moment().format('YYYY-MM-DD HH:mm');
    var ep = new eventproxy();
    ep.on('prop_err', function (msg) {
        res.render('add_invoice', {error: msg});
    });

    // 验证信息的正确性(判断数据是否为空)
    if ([invoice_money,invoice_remarks].some(function (item) { return item === ''; })) {
        ep.emit('prop_err', '请填写完整信息。');
        return false;
    }

    if (!validator.isNumeric(invoice_money)) {
        ep.emit('prop_err','金额格式不正确.');
        return ;
    }

    invoiceModels.addInvoiceData(invoice_money,invoice_remarks,uid,create_time,function(err,data){
        if (err) {
            return next(err);
        }
        res.render('success_page',{msg:'新增发票成功！',url:'/invoice'});
        logger.info('add invoice success.');
        logger.info(data);
    });
};

/**
 * 获取发票数据
 */
exports.getInvoiceData = function (req,res,next) {
    var ep  = new eventproxy();
    var mo = moment();
    var time =  mo.format('YYYY-MM-DD');
    var nextDay = mo.add(1,'days');
    var params = {
        startTime: time +' '+ config.workStartTime,
        endTime: nextDay.format('YYYY-MM-DD') +' '+ config.workStartTime
    };

    invoiceModels.getInvoiceDataAll(params,function(err,data){
        var dataArray = [];
        dataArray = data[0];
        ep.after('query_complete',data[0].length, function (userData) {
            dataArray.forEach(function (data,index) {
                data.create_time = moment(data.create_time).format('YYYY-MM-DD');
                data.userName = userData[index].reality_name;
                data.uname = userData[index].uname;
                data.avatar = userData[index].avatar;
            });

            var dateArray = [];
            logger.info('GET ALL INVOICES DATA: '+JSON.stringify(data[1]));
            data[1].forEach(function (data) {
                data.create_time = moment(data.create_time).format('YYYY-MM-DD');
                dateArray.push(data.create_time);
            });
            //时间去重
            dateArray.push(moment().format('YYYY-MM-DD'));
            var newDateArray = tools.undulpicate(dateArray);

            return res.send({
                success: '获取发票数据成功.',
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
         * 查询用户数据
         */
        for (var i = 0; i<data[0].length; i++) {
            workModels.getUserByUserId(data[0][i].user_id, function (err,data) {
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
 * 根据时间查询发票
 */
exports.queryInvoiceByCreateTime = function (req,res,next) {
    var create_time = req.body.create_time;
    var ep  = new eventproxy();
    if (validator.isEmpty(create_time)){
        return res.send({error:'时间不能为空'});
    }

    invoiceModels.getInvoiceByCreateTime(create_time, function (err,data) {
        if (err) {
            return next(err);
        }

        var dataArray = [];
        dataArray = data;
        ep.after('query_complete',data.length, function (userData) {
            dataArray.forEach(function (data,index) {
                data.create_time = moment(data.create_time).format('YYYY-MM-DD');
                data.userName = userData[index].reality_name;
                data.uname = userData[index].uname;
            });

            return res.send({
                success: '获取首页数据成功.',
                result: {
                    name: req.session.user.reality_name,
                    title: '欢迎你!',
                    is_admin: req.session.user.is_admin,
                    dataArray: dataArray
                }
            });
        });
        /**
         * 查询用户数据
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
    });
};
/**
 * 查询未确认发票数据
 */
exports.unsureInvoice = function (req,res,next) {
    var ep = new eventproxy();
    invoiceModels.queryUnsureInvoice(function (err,data) {
        if (err) {
            next(err);
        }

        var dataArray = [];
        dataArray = data;
        ep.after('query_complete',data.length, function (userData) {
            dataArray.forEach(function (data,index) {
                data.create_time = moment(data.create_time).format('YYYY-MM-DD');
                data.userName = userData[index].reality_name;
                data.uname = userData[index].uname;
                data.avatar = userData[index].avatar;
            });

            return res.send({
                success: '获取首页数据成功.',
                result: {
                    dataArray: dataArray,
                }
            });
        });
        /**
         * 查询用户数据
         */
        for (var i = 0; i<data.length; i++) {
            workModels.getUserByUserId(data[i].user_id, function (err,data) {
                if (err) {
                    return next(err);
                }
                //logger.info(data);
                ep.emit('query_complete',data[0]);
            });
        }
    });
};
/**
 * 确认发票
 */
exports.sureInvoice = function (req,res,next) {
    var invoiceId = req.body.invoiceId;
    if (invoiceId == '') {
        return res.send({
            error: '请填写完整信息',
        });
    }

    invoiceModels.updateInvoiceState(invoiceId,function (err,data) {
        if (err) {
            return next(err);
        }

        return res.send({
            success: '确认发票成功.',
            result: 'OK!'
        });
    });
};


/**
 * 获取我的发票
 */
exports.myInvoice = function (req,res,next) {
    var ep = new eventproxy();
    var uid = req.session.user.id;

    invoiceModels.queryMyInvoice(uid, function (err,data) {
        if (err) {
            return next(err);
        }

        var dataArray = [];
        dataArray = data;
        ep.after('query_complete',data.length, function (userData) {
            dataArray.forEach(function (data,index) {
                data.create_time = moment(data.create_time).format('YYYY-MM-DD');
                data.userName = userData[index].reality_name;
                data.uname = userData[index].uname;
                data.avatar = userData[index].avatar;
            });

            return res.send({
                success: '获取我的发票数据成功.',
                result: {
                    dataArray: dataArray
                }
            });
        });
        /**
         * 查询用户数据
         */
        for (var i = 0; i<data.length; i++) {
            workModels.getUserByUserId(data[i].user_id, function (err,data) {
                if (err) {
                    return next(err);
                }
                //logger.info(data);
                ep.emit('query_complete',data[0]);
            });
        }
    });
};
/**
 * 发票分页
 */
exports.invoicePaginationHandle = function (req,res,next) {
    var ep = new eventproxy();
    var pageNum = req.body.pageNum;

    invoiceModels.queryInvoiceByPageNumber(pageNum, function (err,data) {
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
                data.create_time = moment(data.create_time).format('YYYY-MM-DD');
                data.userName = userData[index].reality_name;
                data.uname = userData[index].uname;
                data.avatar = userData[index].avatar;
            });

            return res.send({
                success: '查询成功!',
                result: dataArray
            });
        });
        /**
         * 查询用户数据
         */
        for (var i = 0; i<data.length; i++) {
            workModels.getUserByUserId(data[i].user_id, function (err,data) {
                if (err) {
                    return next(err);
                }
                ep.emit('query_complete',data[0]);
            });
        }
    });
};

