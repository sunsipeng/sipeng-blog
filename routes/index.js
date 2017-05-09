var express = require('express');
var users = require('../controllers/users');
var router = express.Router();
var auth = require('../common/auth');
var work = require('../controllers/work');
var invoice = require('../controllers/invoices');
var summarize = require('../controllers/summarize');
var furlough = require('../controllers/furlough');

// ROOT
router.get('/', auth.userRequired,work.home);
//首页模板渲染
router.get('/index',auth.userRequired, work.renderHome);
//获取首页数据
router.post('/getIndexData',auth.userRequiredAjax,work.getHomeData);
//工作总结数据获取（工作中 页面渲染）
router.get('/getIndexDataByWorkState',auth.userRequired,work.getHomeDataByState);
//工作总结数据获取（已完成 页面渲染）
router.get('/getCompletedWork',auth.userRequired,work.getCompletedWork);

//登录
router.get('/signin',users.showLogin);
router.post('/signin',users.signin);
//注册
router.get('/signup', auth.adminRequired, users.showSignup);
router.post('/signup',auth.adminRequired,  users.signup);
//登出
router.get('/signout',users.signout);

//新增
router.get('/add',auth.userRequired, work.addWorkPage);
//新增（提交数据-工作计划）
router.post('/addWork',auth.userRequired, work.addWorkHandle);
//新增（提交数据-工作完成）
router.post('/addWorkComplete',auth.userRequired, auth.nameEqualSessionName, work.addWorkComplete);//auth.timeouts.addTimeOuts,

//根据时间查询工作记录（ajax）
router.post('/queryWorkRerord',auth.userRequiredAjax, work.queryWorkRecordByTime);
//根据userId查询工作记录
router.post('/queryWorkRerordByUserId',auth.userRequiredAjax, work.queryWorkRecordByUserId);
//编辑工作总结（页面渲染）
router.get('/edit', auth.userRequired,auth.timeouts.scoreTimeOuts,work.showEdit);
//修改工作记录（工作完成）
router.post('/editWorkRecord',auth.userRequired,auth.timeouts.scoreTimeOuts, auth.nameEqualSessionName, work.editWorkRecord);
//修改工作记录（工作中）
router.post('/editWorkingRecord',auth.userRequiredAjax,auth.timeouts._scoreTimeOuts,auth.nameEqualSessionName,work.editWorkRecordByWorking);

//人员评分（点赞）
router.post('/employeeScore',auth.userRequiredAjax,auth.timeouts._scoreTimeOuts,auth.nameNotEqualSessionName,work.employeeScore);

//发票（页面渲染）
router.get('/invoice',auth.userRequired,invoice.showInvoice);
//新增发票（页面渲染）
router.get('/addInvoice',auth.userRequired,invoice.showAddInvoice);
//提交发票信息
router.post('/addInvoiceInfo',auth.userRequired,invoice.submitInvoiceInfo);
//获取发票数据
router.post('/getInvoiceData',auth.userRequiredAjax,invoice.getInvoiceData);
//根据创建时间查询发票（废弃）
router.post('/queryInvoiceByCreateTime',auth.userRequiredAjax,invoice.queryInvoiceByCreateTime);
//未确认发票数据
router.post('/unsureInvoice',auth.userRequiredAjax, invoice.unsureInvoice);
//确认发票
router.post('/sureInvoice',auth.adminRequired,invoice.sureInvoice);
//我的发票
router.post('/myInvoice',auth.userRequiredAjax,invoice.myInvoice);
//发票分页
router.post('/invoicePagination',auth.userRequiredAjax,invoice.invoicePaginationHandle);

//修改密码（页面渲染）
router.get('/modifyPasswd',auth.userRequired,work.showModifyPasswd);
//修改密码 数据提交
router.post('/updatePasswd',auth.userRequired,work.modifyPasswdHandle);

//汇总（页面渲染）
router.get('/summarize',auth.userRequired, summarize.showSummarize);

//请假
router.get('/furlough',auth.userRequired, furlough.showFurlough);
router.post('/getFurloughAll',auth.userRequiredAjax, furlough.getFurloughAll);

//添加请假数据
router.get('/addFurlough',auth.userRequired, furlough.showAddFurlough);
router.post('/addFurlough',auth.userRequired, furlough.addFurlough);

//审核请假
router.post('/auditFurlough',auth.adminRequired, furlough.auditFurlough);
router.post('/checkPending',auth.adminRequired, furlough.checkPending);

router.post('/furloughPagination',auth.userRequired, furlough.furloughPaginationHandel);
router.get('/replay',furlough.showReplayPage);
router.get('/getReplayData',furlough.getReplayData);

//计算昨日工作累加时间
//router.post('/yesterdayWorkTime',auth.userRequired,summarize.yesterdayWorkTimeInfo);

module.exports = router;
