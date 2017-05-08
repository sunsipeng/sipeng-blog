/**
 * Created by chancy on 2017/2/7.
 */

var moment = require('moment');
//var work = require('../models/models_work');
var config = require('../config');

var moTest = function(){
    var mo = moment();
    mo.add(1,'days');
    var time =  mo.format('L');

    var nextDay = undefined;
    var mome = moment();
    if(nextDay){
        mome.add(1,'days');
    }
    var startTime = '09:00';
    var endTime = '18:30';
    var cDate = mome.format('YYYY-MM-DD');
    console.log(cDate);
    var sT = new Date(''+cDate+','+startTime+'').getTime();
    var eT = new Date(''+cDate+','+endTime+'').getTime();

    var leftTime = eT-sT;
    var leftsecond = parseInt(leftTime/1000);
    var day1=Math.floor(leftsecond/(60*60*24));
    var hour=Math.floor((leftsecond-day1*24*60*60)/3600);
    var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60);
};

/**
 * 超时判断测试
 */
var timeouts = function (){
    var mo = moment();
    var time =  mo.format('YYYY-MM-DD');
    var nextDay = mo.add(1,'days');
    var params = {
        uid: 3,
        startTime: time +' '+ config.workStartTime,
        endTime: nextDay.format('YYYY-MM-DD') +' '+ config.workStartTime,
    };
    console.log('[LOG]=> ' + JSON.stringify(params));
    work.getWorkRecordByUserId(params,function(err,data){
        if (err) {
            console.log('ERROR'+JSON.stringify(err));
            return false;
        }

        if (data.length){
            return res.render('error_page',{error:'不能在当天完成重复的操作!', url:'/index'});
        } else {
            next();
        }
        console.log('查询成功===' + JSON.stringify(data));
    });
};

//timeouts();


var dataFormat = function (){
    var start_worktime = moment('2017-02-08T01:00:00.000Z').format('YYYY-MM-DD');
    var end_worktime = moment('2017-02-08T10:30:00.000Z').format('YYYY-MM-DD');
    console.log(start_worktime + '/////' + end_worktime);
};

/**
 * 时间差计算
 */
var calcTimer = function(){

    var startTime = '09:00';
    var endTime = '18:30';
    var nextDay = false;

    var currentMo = moment();
    var nextMo = moment();

    if (nextDay) {
        nextMo.add(1,'days');
    }
    var cDate = currentMo.format('YYYY-MM-DD');
    var nDate = nextMo.format('YYYY-MM-DD');
    var sT = new Date(''+cDate+','+startTime+'').getTime();
    var eT = new Date(''+nDate+','+endTime+'').getTime();
    var leftTime = eT-sT;

    var leftsecond = parseInt(leftTime/1000);
    //var hours = ( leftsecond / (60 * 60) ).toFixed(1);
    var hours = parseFloat( leftsecond / (60 * 60) );
    var minutes = Math.ceil(hours/60);

    var overtimeVal = hours - config.workTime;

    console.log('时间差 ' +　hours +'小时 '+minutes+'分钟' );
    console.log('开始时间 ' + cDate+' '+startTime);
    console.log('结束时间 ' + nDate+' '+endTime);
    console.log('是否隔天 ' + nextDay);
    console.log('加班时间' + overtimeVal.toFixed(1));

    var oTime = overtimeVal.toFixed(1);

    console.log('加班时间======| |======='+oTime);
}   ;

//calcTimer();

//dataFormat();
/*
 var createTime = data[0].create_time;
 var currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
 var sT = new Date(''+createTime+'').getTime();
 var eT = new Date(''+currentTime+'').getTime();

 var calcTime = sT - eT;

 //calc
 var leftsecond = parseInt(calcTime/1000);
 var day1=Math.floor(leftsecond/(60*60*24));
 var hour=Math.floor((leftsecond-day1*24*60*60)/3600);

 //判断是否在24小时之内
 if (hour<24) {
 console.log('不能在当天完成重复的操作' + hour);
 } else {
 console.log('可以操作');
 }
*/

var mo = moment();
var endTimer = mo.format('YYYY-MM-DD HH:mm:ss');

console.log(endTimer);
//console.log(hour + '====' + minute);