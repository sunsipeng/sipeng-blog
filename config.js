/**
 * Created by chancy on 2017/2/5.
 * 项目配置文件
 */
var mysqlConfig = require('./common/mysql-config');
var gameData = require('./common/replayData');

var config = {
    mysql: {
        host     : mysqlConfig.mysql.host,
        user     : mysqlConfig.mysql.user,
        password : mysqlConfig.mysql.password,
        port: mysqlConfig.mysql.port,
        database: mysqlConfig.mysql.database
    },
    auth_cookie_name: 'zhiyi_evaluation',
    session_secret:'zhiyi_evaluation_secret',
    adminName: 'sipeng',
    workTime: 9.5, //正常工作时间
    workStartTime:'09:00',//正常上班时间
    nextDayEndTime:'09:00',//隔日结束时间
    offWorkTime: '18:30',
    sysAutoWorkSummary: '系统自动完结该工作记录.',//系统自动结束工作总结 WorkContent
    port: 3000,
    workContentSplit: "[--{[ - ]}--]",// "工作计划" / "工作总结" 分隔符
    FurloughTypes: ['事假','病假','年假','调休','婚假','产假','陪产假','路途假','其他'],
    replayData: gameData
};

module.exports = config;