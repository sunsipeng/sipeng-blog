/**
 * 卡五星 公共变量
 */
var GC = GC || {};

GC.TIME = 2;
//3D LOG输出
GC.log = function(text){
    //var log = JSON.stringify(text);
    console.log(text);
    //console.log("%c"+(typeof text == "string" ? text : log)+""," text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:3em");
};
//彩色背景LOG 输出
GC.logColor = function(text){
    console.log(text);
    //console.log("%c"+text+"","background: rgba(252,234,187,1);background: -moz-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%,rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -webkit-gradient(left top, right top, color-stop(0%, rgba(252,234,187,1)), color-stop(12%, rgba(175,250,77,1)), color-stop(28%, rgba(0,247,49,1)), color-stop(39%, rgba(0,210,247,1)), color-stop(51%, rgba(0,189,247,1)), color-stop(64%, rgba(133,108,217,1)), color-stop(78%, rgba(177,0,247,1)), color-stop(87%, rgba(247,0,189,1)), color-stop(100%, rgba(245,22,52,1)));background: -webkit-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -o-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -ms-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: linear-gradient(to right, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fceabb', endColorstr='#f51634', GradientType=1 );font-size:5em")
};
//红色LOG 输出
GC.logred = function (text) {
    console.log('%c'+text+'','color:red;font-size:15px;');
};
//GC.log = GC.logColor = GC.logred = Function.prototype.bind.call(console.log,console);
//记录玩家碰杠标识
GC.isBump = false;
//记录玩家碰杠标识 -- 不包括玩家一
GC.isBumpOtherplayer2 = false;
GC.isBumpOtherplayer3 = false;
//碰杠索引
GC.PG_INDEX = 0;
//胡牌玩家
GC.HU_PLAYER = "";
//胡牌序号
GC.HU_NUMBER = "";

//游戏数据
GC.gameData = {};

//{"head":{"200574":{"gold":96,"ip":"192.168.1.104","name":"chen002","ting":true,"id":200574,"avatar":"HS_9","type":2,"hname":"庄x2 牛逼x2  自摸x2 摸宝x2"},"200576":{"gold":-32,"ip":"192.168.1.104","name":"chen004","ting":false,"id":200576,"avatar":"HS_9","type":0,"hname":""}},"body":"0,1:[35, 37, 38, 38, 41, 50, 51, 54, 55, 55, 56, 87, 87];1,1:[36, 40, 40, 41, 41, 49, 50, 51, 52, 55, 57, 84, 87];2,1:[34, 36, 37, 37, 38, 40, 49, 53, 57, 81, 81, 84, 84];0,2:81;0,3:81;2,5:81;2,3:49;0,2:36;0,3:56;1,2:35;1,3:87;0,5:87;0,3:54;1,2:40;1,3:55;0,5:55;0,3:41;1,5:41;1,3:84;2,5:84;2,3:57;0,2:84;0,3:84;1,2:53;1,3:57;2,2:53;2,3:40;1,7:40;1,2:39;1,3:39;2,2:52;2,3:34;0,2:51;0,3:51;1,2:38;1,3:38;2,2:35;2,3:35;0,2:36;0,3:36;1,2:34;1,3:50;2,2:55;2,3:55;0,2:34;0,3:34;1,2:51;1,3:51;2,2:54;2,3:37;0,2:53;0,3:53;2,9:53;"};
//{"head":{"200573":{"gold":-32,"ip":"192.168.1.104","name":"chen001","ting":false,"id":200573,"avatar":"HS_9","type":0,"hname":""},"200575":{"gold":-32,"ip":"192.168.1.104","name":"chen003","ting":false,"id":200575,"avatar":"HS_9","type":0,"hname":""},"200574":{"gold":96,"ip":"192.168.1.104","name":"chen002","ting":true,"id":200574,"avatar":"HS_9","type":2,"hname":"庄x2 牛逼x2  自摸x2 摸宝x2"},"200576":{"gold":-32,"ip":"192.168.1.104","name":"chen004","ting":false,"id":200576,"avatar":"HS_9","type":0,"hname":""}},"body":"0,1:[22, 23, 24, 24, 25, 34, 41, 49, 53, 54, 56, 68, 87];1,1:[18, 20, 34, 35, 38, 38, 50, 53, 54, 57, 71, 71, 81];2,1:[17, 18, 25, 33, 35, 39, 40, 41, 51, 52, 68, 74, 84];3,1:[21, 21, 22, 24, 25, 35, 41, 49, 51, 56, 57, 65, 71];1,2:17;1,3:81;2,2:20;2,3:84;3,2:40;3,3:71;1,5:71;1,3:17;2,2:49;2,3:74;3,2:33;3,3:65;0,2:65;0,3:68;1,2:22;1,3:50;2,4:[51, 52, 50];2,3:68;3,2:74;3,3:74;0,2:81;0,3:87;1,2:81;1,3:81;2,2:38;2,3:49;3,2:65;3,3:65;0,2:21;0,3:81;1,2:38;1,3:57;2,2:56;2,3:56;3,2:33;3,3:35;0,2:54;0,3:65;1,2:22;1,3:35;2,2:65;2,3:65;3,2:20;3,3:20;0,2:68;0,3:68;1,2:55;1,3:34;2,4:[33, 35, 34];2,3:25;3,2:19;3,3:19;0,2:19;0,3:19;1,2:50;1,3:50;2,2:54;2,3:54;0,5:54;0,3:49;1,2:57;1,3:57;2,2:34;2,3:34;3,2:53;3,3:53;0,2:37;0,3:41;1,2:37;1,3:37;2,2:23;2,3:23;3,4:[24, 25, 23];3,3:22;0,2:18;0,3:18;1,2:74;1,3:74;2,2:81;2,3:81;3,2:53;3,3:49;0,2:55;0,3:53;1,2:51;1,3:51;2,2:36;2,3:36;3,2:40;3,3:41;0,2:17;0,3:17;1,2:56;1,3:56;2,2:36;2,3:36;3,2:19;3,3:19;0,2:84;0,3:84;1,2:68;1,3:68;2,2:33;2,3:33;3,5:33;3,3:51;0,2:87;0,3:87;1,2:34;1,3:34;2,2:36;2,3:36;3,2:87;3,3:87;0,2:84;0,3:84;1,2:50;1,3:50;2,2:52;2,3:52;3,2:23;3,3:23;0,2:50;0,3:50;1,2:52;1,3:52;2,2:37;2,3:37;3,2:49;3,3:49;0,2:51;0,3:51;1,2:87;1,3:87;2,2:39;2,3:39;3,2:84;3,3:84;0,2:21;0,3:24;1,2:17;1,3:17;2,2:18;2,3:17;3,2:55;3,3:53;0,2:36;0,3:37;1,2:39;2,9:53;"};

//玩家起手牌
GC.startCards = {};

//玩家信息
GC.playerInfo = [];
//游戏主题
GC.theme = 1;

//游戏背景图
GC.gameBGUrl  = 'http://sipeng.net/yanshi/game_bg.png';
//时间数据
GC.createTimeVal = '03:00';

//游戏广告信息
GC.advInfo = {
    gameLogo: 'http://sipeng.net/yanshi/advLogo.png',
    gameQR: 'http://sipeng.net/yanshi/advQR.png'
};
//游戏名称
GC.APP_NAME = '麻将回放';
//游戏介绍
GC.gameDesc = '麻将简写信息，麻将简写信息，麻将简写信息';

//结算配置项
GC.settlementConfig = {};

//加载网络图片
GC.loadNetWorkImg = function (imgUrl,scb,fcb) {
    var imgObj = new Image();
    imgObj.src = imgUrl;
    imgObj.onload = function(){
        scb(imgObj);
    };
    imgObj.onerror=function(){
        fcb !== undefined ? fcb() : '';
    };
};

//数据指令
GC.Instr = {
    Allowcate : 1, // 起手牌
    GetIn : 2, //抓牌
    ThrowOut : 3, //出牌
    Chi : 4, //吃牌
    Peng : 5, //碰牌
    Gang_Zhua : 6, //抓杠
    Gang_Ming : 7, //明杠
    Gang_An : 8, //暗杠
    Hu : 9, //胡牌
    Zimo : 10, //自摸
    LiuJu : 11 //流局
};
//游戏播放速度
GC.gameSpeed = 1;
/**
 * 玩家全局指令
 */
GC.$INSTR = [];

//获取URL参数
GC.getRequest = function() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = {};
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
};

/**
 * 读取JSON文件
 */
GC.readJSON = function (json,callback) {
    var xhr = cc.loader.getXMLHttpRequest();
    xhr.onreadystatechange = function () {
        switch (xhr.readyState) {
            case 4:
                if (xhr.status == 200) {
                    var $xhr = eval("(" + xhr.responseText + ")");
                    callback(false,$xhr);
                } else {
                    callback(true,'读取配置文件失败!');
                }
                break;
            default :
                break;
        }
    };
    xhr.open( "GET", json);
    xhr.send();
};

/**
 * 游戏数据解析
 */
GC.CardDataAnalysis = function () {
    var dataBody = GC.gameData.body_s;
    var playerALLAction = dataBody.split(";");
    playerALLAction.pop();

    var playerAndInstrArr = [];
    playerALLAction.forEach(function (obj,index) {
        playerAndInstrArr.push(obj.split(":"));
    });

    /**
     * 获取起手牌
     */
    var playerAndInstr = [],
        cards=[];
    for( var i = 0; i< playerAndInstrArr.length; i++ ){
        playerAndInstr.push(playerAndInstrArr[i][0]);
        cards.push(playerAndInstrArr[i][1]);
    }

    playerAndInstr.forEach(function (obj,index) {
       var player = obj.split(",")[0];
       var instr = obj.split(",")[1];
       if(instr == 1){
           GC.startCards["player" + (parseInt(player)+1)] = JSON.parse(cards[index]);
       }
       /**
        * 赋值玩家全局指令
        * 除去玩家起手牌
        */
       if(index >= 4){
           GC.$INSTR.push({
               player: parseInt(player) + 1,
               instr: instr,
               card: cards[index]
           });
       }
    });

    /**
     * 解析head数据
     * TODO 服务器放回碰牌、杠牌、漂牌分数时。修改相应的字段
     */
    var headesObj = GC.gameData.head_s;
    for ( var gd in headesObj ) {
        GC.playerInfo.push(headesObj[gd]);
    }

    /**
     * 解析结算配置
     */
    GC.settlementConfig = GC.gameData.settlement;
};