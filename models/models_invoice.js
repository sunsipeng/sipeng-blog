/**
 * Created by chancy on 2017/2/15.
 * 发票models
 */
//var connect = require('../models/connect-db');
var logger = require('log4js').getLogger('invoice_models');

/**
 * 添加发票信息
 * @param money 发票金额
 * @param remarks 备注信息
 * @param callback 回调函数
 */
exports.addInvoiceData = function (money, remarks,uid,create_time, callback) {
    var sql = 'INSERT INTO invoices(invoice_money,invoice_remarks,user_id,create_time) VALUES(?,?,?,?)';
    var sql_params = [money,remarks,uid,create_time];
    global.connect.query(sql,sql_params,callback);
};
/**
 * 获取发票数据
 * @param callback
 */
exports.getInvoiceDataAll = function (params,callback) {

    var sql1 = 'SELECT * FROM invoices order by create_time desc';
    //var sql1 = 'SELECT * FROM invoices WHERE create_time >= "'+params.startTime+'" AND create_time <="'+params.endTime+'"';
    var sql2 = 'SELECT * FROM invoices';

    global.connect.query(''+sql1+';'+sql2+'',callback);
};

/**
 * 根据创建时间查询发票
 * @param time
 * @param callback
 */
exports.getInvoiceByCreateTime = function (time,callback) {
    var sql = 'SELECT * FROM invoices WHERE create_time LIKE "%'+time+'%" ';
    global.connect.query(sql,callback);
};
/**
 * 查询为确认发票数据
 * @param callback
 */
exports.queryUnsureInvoice = function (callback) {
    var sql = 'SELECT * FROM invoices WHERE invoice_sure=0';
    global.connect.query(sql,callback);
};
/**
 * 修改发票状态
 */
exports.updateInvoiceState = function(invoiceId,callback){
    var sql = 'UPDATE invoices SET invoice_sure=1 WHERE id='+invoiceId+'';
    global.connect.query(sql,callback);
};

/**
 * 查询我的发票
 * @param uid
 * @param callback
 */
exports.queryMyInvoice = function (uid,callback) {
    var sql = 'SELECT * FROM invoices WHERE user_id='+uid+'';
    global.connect.query(sql,callback);
};

/**
 * 发票分页查询
 */
exports.queryInvoiceByPageNumber = function (pageNum,callback) {
    //0 5 10   1-1*5, 2-1*5, 3-1*5
    var sql = 'SELECT * FROM invoices where user_id IS NOT NULL ORDER BY id DESC limit '+(pageNum-1)*5+' ,5';
    global.connect.query(sql,callback);
};