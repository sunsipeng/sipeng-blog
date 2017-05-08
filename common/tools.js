var bcrypt = require('bcryptjs');
var moment = require('moment');
var config = require('../config');
moment.locale('zh-cn'); // 使用中文
var logger = require('log4js').getLogger("tools");

// 格式化时间
exports.formatDate = function (date, friendly) {
  date = moment(date);

  if (friendly) {
    return date.fromNow();
  } else {
    return date.format('YYYY-MM-DD HH:mm');
  }

};

exports.validateId = function (str) {
  return (/^[a-zA-Z0-9\-_]+$/i).test(str);
};

/**
 * 密码解密
 * @param str
 * @param callback
 */
exports.bhash = function (str, callback) {
  bcrypt.hash(str, 10, callback);
};
/**
 * 密码加密
 * @param str
 * @param hash
 * @param callback
 */
exports.bcompare = function (str, hash, callback) {
  bcrypt.compare(str, hash, callback);
};

/**
 * 数组去重
 * @param array
 * @returns {*}
 */
exports.undulpicate = function(array){
  for(var i=0;i<array.length;i++) {
    for(var j=i+1;j<array.length;j++) {
      if(array[i]===array[j]) {
        array.splice(j,1);//删除重复数据
        j--;
      }
    }
  }
  return array;
};
/**
 * 通过create_time去重
 */
exports.undulpicateCreateTime = function(array){
    for(var i=0;i<array.length;i++) {
        for(var j=i+1;j<array.length;j++) {
            if(array[i].create_time === array[j].create_time) {
                array.splice(j,1);//删除重复数据
                j--;
            }
        }
    }
    return array;
};
/**
 * 计算加班时间
 * @param startTime 开始时间
 * @param endTime 结束时间
 * @returns {*} 加班时间
 */
exports.calcOverTime = function (startTime,endTime,nextDay) {

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
    var hours = ( leftsecond / (60 * 60) ).toFixed(1);
    var minutes = Math.ceil(hours/60);

    var overtimeVal = hours - config.workTime;

    logger.info('时间差 ' +　hours +'小时'+minutes+'分钟' );
    logger.info('开始时间 ' + cDate+' '+startTime);
    logger.info('结束时间 ' + nDate+' '+endTime);
    logger.info('是否隔天 ' + nextDay);
    logger.info('加班时间' + overtimeVal.toFixed(1));

    var oTime = overtimeVal.toFixed(1);

    return oTime < 0 ? 0 : overtimeVal.toFixed(1);
};

/**
 * 判断是否为空
 */
exports.isEmpty = function(val){
    return ( val.replace(/(^\s*)|(\s*$)/g, "") == '' );
};

/**
 * 获取客户端IP地址
 * @param req
 * @returns {*|string|string}
 */
exports.getClientIp = function(req) {
    return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
};

/**
 * 判断是否在当天时间
 * @returns 时间段
 */
exports.calcParams = function() {
    var mo = moment();//'2017-03-01 00:02'
    //断是否在零点到-九点之间
    var tempTime = mo.format('HH:mm'),
        time = 0,
        nextDay = 0;
    if (tempTime >='00:00' && tempTime <= config.nextDayEndTime ) {
        logger.debug('零点查询');
        mo.subtract(1, 'days');
        time = mo.format('YYYY-MM-DD');
        nextDay = mo.add(1,'days');
    } else {
        logger.debug('正常查询');
        time = mo.format('YYYY-MM-DD');
        nextDay = mo.add(1,'days');
    }

    //var time =  mo.format('YYYY-MM-DD');
    //var nextDay = mo.add(1,'days');
    var params = {
        startTime: time +' '+ config.workStartTime,
        endTime: nextDay.format('YYYY-MM-DD') +' '+ config.nextDayEndTime,
    };

    logger.warn(params);
    return params;
};
/**
 * 计算时间差
 */
exports.calcTimePoor = function (startTime,endTime) {
    var currentMo = moment();
    var nextMo = moment();

    var cDate = currentMo.format('YYYY-MM-DD');
    var nDate = nextMo.format('YYYY-MM-DD');
    var sT = new Date(''+startTime+'').getTime();
    var eT = new Date(''+endTime+'').getTime();
    var leftTime = eT-sT;

    var leftsecond = parseInt(leftTime/1000);
    var hours = ( leftsecond / (60 * 60) ).toFixed(1);

    return hours < 0 ? 0 : hours;
};