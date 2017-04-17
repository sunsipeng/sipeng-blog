/**
 * Created by chancy on 2017/3/11.
 */

var express = require('express');
var router = express.Router();
var auth = require('../common/auth');
var users = require('../controllers/admin.users');
var home = require('../controllers/admin.home');

//后台首页 /admin
router.get('/', auth.userRequired, home.renderHome);
router.get('/home', auth.userRequired, home.innerHome);
//登录
router.get('/signin',users.showLogin);
router.post('/signin',users.signin);
//登出
router.get('/signout',users.signout);
//注册
router.get('/signup',users.showSignup);
router.post('/signup', users.signup);
//添加栏目
router.get('/addChannel',auth.userRequired,home.showAddChannel);
router.post('/addChannel',auth.userRequiredAjax,home.addChannel);

router.get('/worker',home.serviceWorker);

module.exports = router;