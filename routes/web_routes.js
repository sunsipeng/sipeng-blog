var express = require('express');
var router = express.Router();
var fs = require("fs");


/**
 * APP测试路由
 */
//热更新
router.get("/hotreload", function (request,response) {
    response.send("3.0");
});
//头像上传
router.post("/soundDataUpload",function(request,response){
    console.log("请求头像上传接口。。。。。"+ JSON.stringify(request.body.soundData));
});

var listArr = [
    {
        imgurl:'http://www.sipeng.net/ParentPage/CSScontent/effectspage/Photowall/Images/1.jpg',
        title:'React 基础教程',
        desc:'最强前端JS框架'
    },
    {
        imgurl:'http://www.sipeng.net/ParentPage/CSScontent/effectspage/Photowall/Images/1.jpg',
        title:'使用React Native 开发原生APP ',
        desc:'RN制作 Android IOS APP'
    },
    {
        imgurl:'http://www.sipeng.net/ParentPage/CSScontent/effectspage/Photowall/Images/1.jpg',
        title:'Andular JS 使用教程',
        desc:'MVVM 设计模式'
    },
    {
        imgurl:'http://www.sipeng.net/ParentPage/CSScontent/effectspage/Photowall/Images/1.jpg',
        title:'HTML5 Canvas 技术讲解',
        desc:'canvas技术讲解'
    }
];
router.get("/reactTest",function(request,response,next){
//	return next(new Error('this is error massage !!!'));
    console.log("请求成功" + request.query.uname);
    console.log("请求成功111" + request.query.passwd);
    response.send({
        info:'请求成功！',
        result:listArr
    });
});

router.post("/reactTest1",function(request,response,next){
    console.log("请求成功" + request.body.uname);
    console.log("请求成功000" + request.body.passwd);
    response.send({
        info:'请求成功！',
        result:listArr
    });
});

router.post('/upload',function(request,response){
	console.log(request);
	response.send({success:'请求成功！'})
});
//APP测试请求
router.get("/h5Test",function(request,response){
	console.log('IP Address: =>',request.connection.remoteAddress);
	//四人
    response.send({"result":{"id":"70327","security_s":"dcj1qnha","game_id":"75","head_s":"{\"200134\":{\"id\":200134,\"ting\":true,\"seat\":3,\"name\":\"\\u5fc3\\u7d20\\u5982\\u7b80\",\"hname\":\"\",\"gold\":0,\"type\":1,\"avatar\":\"http:\\\/\\\/wx.qlogo.cn\\\/mmopen\\\/K4cib29XHnudsI3pLbnUZG8T5FfiayxyUjDQvVGHNMzBlXnicFIPJ6r7V3reXToTNp2MV8icPeh46aVkzPLf6llCKo5ZW5txz36u\\\/0\",\"ip\":\"113.129.226.212\"},\"200537\":{\"id\":200537,\"ting\":false,\"seat\":0,\"name\":\"\\u6b63\\u70b9\\u7269\\u6d41\",\"hname\":\"\",\"gold\":-10,\"type\":0,\"avatar\":\"http:\\\/\\\/wx.qlogo.cn\\\/mmopen\\\/PL5y7QQHZgJgX58C6Sibqwicnd5kXtqMMxrWkvbRibOLETFDFcDojBkpb6EibcIiaJWcJ1EQ9FpKInh6erQWvtZRaYQ\\\/0\",\"ip\":\"112.246.2.45\"},\"200270\":{\"id\":200270,\"ting\":false,\"seat\":2,\"name\":\"\\u6d77\\u7eb3\\u767e\\u5ddd\",\"hname\":\"\",\"gold\":20,\"type\":-1,\"avatar\":\"http:\\\/\\\/wx.qlogo.cn\\\/mmopen\\\/ltDdlb2qdo5frM1yFLyn47nyzib3nVtJTs6ukkOx0ej8KNoJhxic4dGNTILORWPxCsAYmCcdPYBhpicEmr7bh4eGcdlKib23u1LJ\\\/0\",\"ip\":\"117.136.94.139\"},\"200280\":{\"id\":200280,\"ting\":false,\"seat\":1,\"name\":\"LFH\",\"hname\":\"\",\"gold\":-10,\"type\":0,\"avatar\":\"http:\\\/\\\/wx.qlogo.cn\\\/mmopen\\\/K4cib29XHnudsI3pLbnUZG6csQnGQOcCYaCgR5nZzochicXKBZ3Xmqo8mwQuRzxiaLJY4Y2N4DYqGjwBm2JtpX7vf6uty68qAnv\\\/0\",\"ip\":\"144.0.141.158\"}}","body_s":"0,1:[17, 18, 21, 23, 33, 35, 37, 39, 52, 53, 56, 56, 56, 65, 71, 87];1,1:[21, 25, 25, 34, 36, 41, 41, 50, 54, 55, 55, 56, 57, 65, 84, 87];2,1:[17, 17, 19, 19, 35, 35, 40, 50, 51, 52, 57, 65, 68, 68, 71, 84];3,1:[17, 18, 19, 19, 20, 21, 21, 22, 34, 36, 37, 39, 39, 57, 81, 81];0,12:34;0,26:[33, 87]|[74, 50];1,26:[87]|[20];0,2:24;0,3:24;1,2:40;1,3:65;2,2:52;2,3:57;3,2:53;3,3:53;0,2:51;0,3:53;1,4:[54, 55, 53];1,3:84;2,2:54;2,3:84;3,2:65;3,3:65;0,2:38;0,3:35;2,5:35;2,3:71;3,2:50;3,3:50;0,2:25;0,3:25;1,5:25;1,3:50;2,4:[51, 52, 50];2,3:52;3,2:51;3,3:51;0,2:20;0,3:20;1,2:41;1,3:36;2,2:74;2,3:74;3,2:37;3,3:36;0,2:38;0,3:38;1,2:22;1,10:22;","create_time":"08:33","settlement":{"gold":"\u5206\u6570"},"theme":"1"},"errCode":0,"resouce":{"name":"\u83cf\u6cfd\u9ebb\u5c06","descr":"\u597d\u5ba2\u5c71\u4e1c\u68cb\u724c","logo":"http:\/\/www.areplay.com\/replay_themes\/images\/5942329f5a42d.png","codeimg":"http:\/\/www.areplay.com\/replay_themes\/images\/5942329f5a158.png","img":"http:\/\/www.areplay.com\/replay_themes\/images\/5942329f5b64b.png"},"referer":"","state":"fail"});
//	response.send({"result":{"id":"95927","security_s":"ps2o4dbl","room_id":null,"game_id":"75","game_key":null,"info_s":null,"head_s":"{\"200767\":{\"id\":200767,\"ting\":true,\"seat\":2,\"name\":\"\\u82cd\\u9e70\",\"hname\":\"\",\"gold\":0,\"type\":-1,\"avatar\":\"http:\\\/\\\/wx.qlogo.cn\\\/mmopen\\\/KibVryfCUVUHA93l5QaibvLtK3NqgXyv7nSianLHnZRH2tiavzmAQlOiact2xFiaDNCL3ibHpyFOx2FjlD9mft20BicnOQicMialA4iaWXG\\\/0\",\"ip\":\"119.187.9.113\"},\"200450\":{\"id\":200450,\"ting\":true,\"seat\":0,\"name\":\"\\u5f64\\u5b9dM\",\"hname\":\"\\u78b0\\u78b0\\u80e1x2 \",\"gold\":10,\"type\":1,\"avatar\":\"http:\\\/\\\/wx.qlogo.cn\\\/mmopen\\\/PL5y7QQHZgI7xyoCINz2vDDGaoKu6NeCxaxs5pvxZu48WWibooJOJ0tWPyTxQVNxax9cQRicqxXvsOOlxpqqzNv3locsicNX4hk\\\/0\",\"ip\":\"144.0.157.221\"},\"200280\":{\"id\":200280,\"ting\":false,\"seat\":1,\"name\":\"LFH\",\"hname\":\"\",\"gold\":-10,\"type\":0,\"avatar\":\"http:\\\/\\\/wx.qlogo.cn\\\/mmopen\\\/K4cib29XHnudsI3pLbnUZG6csQnGQOcCYaCgR5nZzochicXKBZ3Xmqo8mwQuRzxiaLJY4Y2N4DYqGjwBm2JtpX7vf6uty68qAnv\\\/0\",\"ip\":\"223.96.244.80\"}}","body_s":"0,1:[17, 21, 34, 34, 36, 37, 39, 49, 51, 53, 55, 65, 68];1,1:[18, 19, 35, 41, 41, 50, 51, 52, 53, 56, 65, 74, 87];2,1:[17, 18, 18, 19, 20, 23, 24, 25, 25, 35, 36, 38, 56];2,2:20;2,3:56;0,2:68;0,3:65;1,2:23;1,3:74;2,2:20;2,3:38;0,2:21;0,3:17;1,2:71;1,3:65;2,2:55;2,3:18;0,2:57;0,3:39;1,2:22;1,3:71;2,2:17;2,3:55;0,2:37;0,3:57;1,2:25;1,3:25;2,5:25;2,3:24;0,2:84;0,3:84;1,2:50;1,3:87;2,2:56;2,3:56;0,2:55;0,3:49;1,2:55;1,3:35;2,2:20;2,8:20;2,2:57;2,3:57;0,2:81;0,3:81;1,2:38;1,3:38;2,2:33;2,3:33;0,2:81;0,3:81;1,2:18;1,3:56;2,2:65;2,3:65;0,2:34;0,3:51;1,2:24;1,3:55;0,5:55;0,3:53;1,2:37;1,3:37;0,5:37;0,3:36;1,2:40;1,3:40;2,2:87;2,3:87;0,2:23;0,3:23;1,2:23;1,3:23;2,2:33;2,3:33;0,2:40;0,3:40;1,2:84;1,3:84;2,2:21;2,3:23;0,2:24;0,3:24;1,2:33;1,3:33;2,2:17;2,3:21;0,9:21;","create_time":"08:33","settlement":{"gold":"\u5206\u6570"},"theme":"1"},"errCode":0,"resouce":{"name":"\u83cf\u6cfd\u9ebb\u5c06","descr":"\u597d\u5ba2\u5c71\u4e1c\u68cb\u724c","logo":"http:\/\/www.areplay.com\/replay_themes\/images\/5942329f5a42d.png","codeimg":"http:\/\/www.areplay.com\/replay_themes\/images\/5942329f5a158.png","img":"http:\/\/www.areplay.com\/replay_themes\/images\/5942329f5b64b.png"},"referer":"","state":"fail"});
	//抓杠
	//response.send({"result":{"id":"67911","security_s":"uagsfq2x","game_id":"75","head_s":"{\"200333\":{\"id\":200333,\"ting\":true,\"seat\":1,\"name\":\"\\u82cf\\u67ab\",\"hname\":\"\",\"gold\":0,\"type\":-1,\"avatar\":\"http:\\\/\\\/wx.qlogo.cn\\\/mmopen\\\/PL5y7QQHZgI7xyoCINz2vMoRYkH8mjvXbFXEAiaUTMJ68Gq2S0I3LVEBHnZhLLgD0TTrZ1ibibNwbXhb9Yv3D8Q2F2EvicSnCw53\\\/0\",\"ip\":\"113.129.185.68\"},\"200632\":{\"id\":200632,\"ting\":true,\"seat\":2,\"name\":\"\\u82b3\",\"hname\":\"\",\"gold\":0,\"type\":1,\"avatar\":\"http:\\\/\\\/wx.qlogo.cn\\\/mmopen\\\/nA2PsFOuk7FFpAu4FQxmG7myNKC9k1MctvRnjViaDSAqwVsGa7QhZXSibVAobrbsFlRlqjdxUCqKmjPAATE4RXoUr6jRUpgPCz\\\/0\",\"ip\":\"113.14.11.206\"},\"200450\":{\"id\":200450,\"ting\":false,\"seat\":0,\"name\":\"\\u5f64\\u5b9dM\",\"hname\":\"\",\"gold\":0,\"type\":0,\"avatar\":\"http:\\\/\\\/wx.qlogo.cn\\\/mmopen\\\/PL5y7QQHZgI7xyoCINz2vDDGaoKu6NeCxaxs5pvxZu48WWibooJOJ0tWPyTxQVNxax9cQRicqxXvsOOlxpqqzNv3locsicNX4hk\\\/0\",\"ip\":\"144.0.155.85\"}}","body_s":"0,1:[34, 35, 39, 39, 41, 49, 51, 53, 55, 55, 56, 57, 65];1,1:[17, 20, 20, 24, 25, 37, 38, 40, 49, 50, 68, 68, 81];2,1:[17, 18, 20, 22, 23, 23, 34, 38, 39, 40, 74, 81, 84];0,2:21;0,3:65;1,2:19;1,3:81;2,2:18;2,3:81;0,2:41;0,3:21;1,2:84;1,3:84;2,2:74;2,3:84;0,2:53;0,3:55;1,2:40;1,3:17;2,2:52;2,3:34;0,2:21;0,3:21;1,2:19;1,3:24;2,2:24;2,3:17;0,2:55;0,3:49;1,2:25;1,3:49;2,2:25;2,3:20;1,5:20;1,3:50;2,2:19;2,3:52;0,2:18;0,3:18;2,5:18;2,3:19;1,5:19;1,3:68;2,2:37;2,3:25;1,5:25;1,3:68;2,2:21;2,3:40;0,2:40;0,3:55;1,2:50;1,3:50;2,2:35;2,3:35;0,2:81;0,3:81;1,2:19;1,6:19;1,2:87;1,3:87;2,2:24;2,3:21;0,2:54;0,3:51;1,2:25;2,9:25;","create_time":"08:33","settlement":{"gold":"\u5206\u6570"},"theme":"1"},"errCode":0,"resouce":{"name":"\u83cf\u6cfd\u9ebb\u5c06","descr":"\u597d\u5ba2\u5c71\u4e1c\u68cb\u724c","logo":"http:\/\/www.areplay.com\/replay_themes\/images\/5942329f5a42d.png","codeimg":"http:\/\/www.areplay.com\/replay_themes\/images\/5942329f5a158.png","img":"http:\/\/www.areplay.com\/replay_themes\/images\/5942329f5b64b.png"},"referer":"","state":"fail"})
	//三人
	//response.send({"result":{"id":"95927","security_s":"ps2o4dbl","room_id":null,"game_id":"75","game_key":null,"info_s":null,"head_s":"{\"200767\":{\"id\":200767,\"ting\":true,\"seat\":2,\"name\":\"\\u82cd\\u9e70\",\"hname\":\"\",\"gold\":0,\"type\":-1,\"avatar\":\"http:\\\/\\\/wx.qlogo.cn\\\/mmopen\\\/KibVryfCUVUHA93l5QaibvLtK3NqgXyv7nSianLHnZRH2tiavzmAQlOiact2xFiaDNCL3ibHpyFOx2FjlD9mft20BicnOQicMialA4iaWXG\\\/0\",\"ip\":\"119.187.9.113\"},\"200450\":{\"id\":200450,\"ting\":true,\"seat\":0,\"name\":\"\\u5f64\\u5b9dM\",\"hname\":\"\\u78b0\\u78b0\\u80e1x2 \",\"gold\":10,\"type\":1,\"avatar\":\"http:\\\/\\\/wx.qlogo.cn\\\/mmopen\\\/PL5y7QQHZgI7xyoCINz2vDDGaoKu6NeCxaxs5pvxZu48WWibooJOJ0tWPyTxQVNxax9cQRicqxXvsOOlxpqqzNv3locsicNX4hk\\\/0\",\"ip\":\"144.0.157.221\"},\"200280\":{\"id\":200280,\"ting\":false,\"seat\":1,\"name\":\"LFH\",\"hname\":\"\",\"gold\":-10,\"type\":0,\"avatar\":\"http:\\\/\\\/wx.qlogo.cn\\\/mmopen\\\/K4cib29XHnudsI3pLbnUZG6csQnGQOcCYaCgR5nZzochicXKBZ3Xmqo8mwQuRzxiaLJY4Y2N4DYqGjwBm2JtpX7vf6uty68qAnv\\\/0\",\"ip\":\"223.96.244.80\"}}","body_s":"0,1:[17, 21, 34, 34, 36, 37, 39, 49, 51, 53, 55, 65, 68];1,1:[18, 19, 35, 41, 41, 50, 51, 52, 53, 56, 65, 74, 87];2,1:[17, 18, 18, 19, 20, 23, 24, 25, 25, 35, 36, 38, 56];2,2:20;2,3:56;0,2:68;0,3:65;1,2:23;1,3:74;2,2:20;2,3:38;0,2:21;0,3:17;1,2:71;1,3:65;2,2:55;2,3:18;0,2:57;0,3:39;1,2:22;1,3:71;2,2:17;2,3:55;0,2:37;0,3:57;1,2:25;1,3:25;2,5:25;2,3:24;0,2:84;0,3:84;1,2:50;1,3:87;2,2:56;2,3:56;0,2:55;0,3:49;1,2:55;1,3:35;2,2:20;2,8:20;2,2:57;2,3:57;0,2:81;0,3:81;1,2:38;1,3:38;2,2:33;2,3:33;0,2:81;0,3:81;1,2:18;1,3:56;2,2:65;2,3:65;0,2:34;0,3:51;1,2:24;1,3:55;0,5:55;0,3:53;1,2:37;1,3:37;0,5:37;0,3:36;1,2:40;1,3:40;2,2:87;2,3:87;0,2:23;0,3:23;1,2:23;1,3:23;2,2:33;2,3:33;0,2:40;0,3:40;1,2:84;1,3:84;2,2:21;2,3:23;0,2:24;0,3:24;1,2:33;1,3:33;2,2:17;2,3:21;0,9:21;","create_time":"08:33","settlement":{"gold":"\u5206\u6570"},"theme":"1"},"errCode":0,"resouce":{"name":"\u83cf\u6cfd\u9ebb\u5c06","descr":"\u597d\u5ba2\u5c71\u4e1c\u68cb\u724c","logo":"http:\/\/www.areplay.com\/replay_themes\/images\/5942329f5a42d.png","codeimg":"http:\/\/www.areplay.com\/replay_themes\/images\/5942329f5a158.png","img":"http:\/\/www.areplay.com\/replay_themes\/images\/5942329f5b64b.png"},"referer":"","state":"fail"})
	//上听
	//response.send({"result":{"id":"194","security_s":"1seuemqn","room_id":"213632136","game_id":"91","game_key":"symj","info_s":"[{\"id\":200036,\"name\":\"\u674e\u5b501\",\"gold\":48},{\"id\":200034,\"name\":\"\u6e38\u5ba2_200212\",\"gold\":0},{\"id\":200025,\"name\":\"AndeLee\",\"gold\":-48}]","head_s":"{\"200025\":{\"id\":200025,\"ting\":false,\"seat\":2,\"name\":\"AndeLee\",\"hname\":\"\u95ed\u95e8x2 \u70b9\u70aex2 \u70b9\u70ae\u5305\u4e09\u5bb6\",\"gold\":-48,\"gang\":0,\"type\":-1,\"avatar\":\"http:\/\/wx.qlogo.cn\/mmhead\/Q3auHgzwzM6Jqw4aSodp7DHnhjPJqMa9SiaYnM4Xic0PibTHHRpInh9RA\/0\",\"ip\":\"123.185.191.205\"},\"200036\":{\"id\":200036,\"ting\":true,\"seat\":0,\"name\":\"\u674e\u5b501\",\"hname\":\"\u5e84x2 \u62a5\u542cx2 \u6760x1 \u63a5\u70ae \u5939\u80e1x2 \",\"gold\":48,\"gang\":0,\"type\":1,\"avatar\":\"HS_9\",\"ip\":\"123.185.191.205\"},\"200034\":{\"id\":200034,\"ting\":false,\"seat\":1,\"name\":\"\u6e38\u5ba2_200212\",\"hname\":\"\u95ed\u95e8x2 \",\"gold\":0,\"gang\":0,\"type\":0,\"avatar\":\"HS_9\",\"ip\":\"123.185.191.205\"}}","body_s":"0,1:[19, 20, 33, 39, 39, 41, 49, 51, 53, 54, 57, 65, 68];1,1:[20, 23, 25, 36, 36, 40, 41, 51, 54, 65, 71, 87, 87];2,1:[17, 34, 36, 37, 37, 39, 40, 40, 50, 50, 57, 68, 81];0,2:74;0,3:74;1,2:56;1,3:56;2,2:55;2,3:81;0,2:57;0,3:65;1,2:18;1,3:87;2,2:18;2,3:68;0,2:18;0,3:68;1,2:51;1,3:71;2,2:57;2,3:55;0,4:[53, 54, 55];0,3:41;1,2:54;1,3:65;2,2:40;2,3:39;0,5:39;0,3:33;0,18:0;1,2:71;1,3:71;2,2:52;2,3:34;0,2:49;0,3:49;1,2:21;1,3:18;2,2:65;2,3:50;0,9:50;","create_time":"08:33","settlement":{"piao":"\u6f02\u724c\u5206","gang":"\u6760\u724c\u5206","hu":"\u80e1\u724c\u5206","gold":"\u5206\u6570","landlord":"1"},"theme":"1"},"errCode":0,"resouce":{"name":"\u76db\u5c06\u5949\u5929","descr":"\u76db\u5c06\u5949\u5929\u68cb\u724c","logo":"http:\/\/replay.yxixia.com\/replay_themes\/images\/5966efab6da05.png","codeimg":"http:\/\/replay.yxixia.com\/replay_themes\/images\/5966efab6d070.png","img":"http:\/\/replay.yxixia.com\/replay_themes\/images\/5966eed045e10.png"},"referer":"","state":"fail"});
	//两人
	//response.send({"result":{"id":"58978","security_s":"vlegou0h","room_id":null,"game_id":"75","game_key":null,"info_s":null,"head_s":"{\"200023\":{\"id\":200023,\"ting\":true,\"seat\":1,\"name\":\"\\u690d\\u7269\\u63a7\",\"hname\":\"\",\"gold\":10,\"type\":1,\"avatar\":\"http:\\\/\\\/wx.qlogo.cn\\\/mmopen\\\/PiajxSqBRaEL9c9ZCN43xD9jaPgyLibeJXN1okMGJEVCbBVs3j3CzZibtzbicacpEjMmELicdujUqsrSJcvwgeicPswQ\\\/0\",\"ip\":\"106.16.115.26\"},\"200010\":{\"id\":200010,\"ting\":false,\"seat\":0,\"name\":\"xin\",\"hname\":\"\",\"gold\":-10,\"type\":-1,\"avatar\":\"http:\\\/\\\/wx.qlogo.cn\\\/mmopen\\\/PL5y7QQHZgKHkdPIgNNIDMsR7rgdg1XWhGUoZNGQPjKhyTSCvFJnL0o6BTViaq75NIENmNiaW49Jfia8fEwopliaJw\\\/0\",\"ip\":\"123.185.188.75\"}}","body_s":"0,1:[22, 22, 35, 38, 39, 49, 54, 57, 57, 68, 71, 71, 87];1,1:[18, 18, 21, 22, 24, 25, 33, 51, 53, 54, 68, 74, 81];0,2:21;0,3:87;1,2:52;1,3:81;0,2:50;0,3:68;1,2:52;1,3:74;0,2:17;0,3:17;1,2:55;1,3:68;0,2:74;0,3:49;1,2:19;1,3:33;0,2:24;0,3:50;1,2:81;1,3:81;0,2:33;0,3:54;1,2:56;1,3:25;0,2:71;0,3:74;1,2:21;1,3:52;0,2:25;0,3:25;1,2:38;1,3:38;0,2:54;0,3:54;1,2:20;1,3:24;0,2:53;0,3:53;1,2:53;1,3:53;0,2:19;0,3:19;1,2:84;1,3:84;0,2:41;0,3:41;1,2:50;1,3:50;0,2:84;0,3:84;1,2:37;1,3:37;0,2:87;0,3:87;1,2:65;1,3:65;0,2:24;0,3:33;1,2:55;1,3:55;0,2:56;0,3:56;1,2:39;1,3:39;0,2:20;0,3:20;1,9:20;","create_time":"08:33","settlement":{"gold":"\u5206\u6570"},"theme":"1"},"errCode":0,"resouce":{"name":"\u83cf\u6cfd\u9ebb\u5c06","descr":"\u597d\u5ba2\u5c71\u4e1c\u68cb\u724c","logo":"http:\/\/www.areplay.com\/replay_themes\/images\/5942329f5a42d.png","codeimg":"http:\/\/www.areplay.com\/replay_themes\/images\/5942329f5a158.png","img":"http:\/\/www.areplay.com\/replay_themes\/images\/5942329f5b64b.png"},"referer":"","state":"fail"});
});

router.get('/paodekuai',function(req,res,next){
	//获取给客户端IP地址
	console.log('IP Address: =>',req.connection.remoteAddress);
	res.send({"result":{"id":"1746","security_s":"8ulz19ux","room_id":"391268706","game_id":"96","game_key":"jpmj","info_s":"[{\"id\":200214,\"name\":\"More\",\"gold\":-114},{\"id\":200218,\"name\":\"\u4e50\u6e05\u7cbe\u54c1\u9ebb\u5c06\u5ba2\u670d\",\"gold\":114}]","head_s":"{\"200214\":{\"id\":200214,\"ting\":true,\"seat\":0,\"name\":\"More\",\"hname\":\"\u53cc\u8d22\u795e\u80e1\u50121 \u6760\u59341 \u767d\u677f1 \u5e73\u80e11 \u6e05\u4e00\u827275  \",\"gold\":-114,\"gang\":0,\"type\":1,\"avatar\":\"http:\/\/wx.qlogo.cn\/mmopen\/vi_32\/DYAIOgq83eqr51nPWAQ4frGFf1licso5LArPMjm9FVF0eeJODe1HVoaibXc6C30FPGoG8YPcscbHiasNZickJs4JBQ\/132\",\"ip\":\"114.243.255.67\"},\"200218\":{\"id\":200218,\"ting\":true,\"seat\":1,\"name\":\"\u4e50\u6e05\u7cbe\u54c1\u9ebb\u5c06\u5ba2\u670d\",\"hname\":\"\",\"gold\":114,\"gang\":0,\"type\":-1,\"avatar\":\"http:\/\/wx.qlogo.cn\/mmopen\/vi_32\/Pn0TUOeA3xic4vv207icDiaNjuibVyEywz4BeBh3kyic1xFZkvibBzqP3jjCtE1ydyDr5px94lkaiabDNrk2e8pKicB1ibw\/132\",\"ip\":\"112.17.237.60\"}}","body_s":"0,1:[45, 35, 19, 51, 21, 52, 36, 70, 68, 43, 58, 71, 56, 69, 62, 77];1,1:[38, 39, 29, 37, 42, 25, 55, 57, 28, 54, 30, 72, 76, 27, 60, 73];2,1:[44, 59, 67, 74, 41, 20, 24, 26, 75, 40, 46, 79, 53, 22, 23, 61];2,2:[74, 41, 24, 23, 22, 53, 20, 67]:6;0,3:0;1,2:[76, 27, 42, 73, 72, 39, 38, 37]:6;2,3:0;0,3:0;1,2:[54]:8;2,2:[40]:8;0,2:[58]:8;1,2:[29]:8;2,2:[46]:8;0,3:0;1,3:0;2,2:[26]:8;0,2:[43]:8;1,2:[30]:8;2,2:[79]:8;0,3:0;1,3:0;2,2:[75, 59]:7;0,2:[45, 77]:7;1,3:0;2,3:0;0,2:[56, 71, 70, 69, 68, 35]:6;1,3:0;2,3:0;0,2:[19, 51]:7;1,2:[57, 25]:7;2,3:0;0,3:0;1,2:[60, 28]:7;2,3:0;0,3:0;1,2:[55]:8;","create_time":"08:33","settlement":{"piao":"\u6f02\u724c\u5206","gang":"\u6760\u724c\u5206","gold":"\u5206\u6570","hu":"\u80e1\u724c\u5206","coinRate":"1","laizi":"1"},"theme":"1"},"errCode":0,"resouce":{"name":"T2","descr":"111","logo":"http:\/\/192.168.0.110:81\/replay_themes\/images\/591fbb1d22a1a.png","codeimg":"http:\/\/192.168.0.110:81\/replay_themes\/images\/591adb556637f.png","img":"http:\/\/192.168.0.110:81\/replay_themes\/images\/591adb5567685.png"},"referer":"","state":"fail"});
});
//旋风杠
router.get('/xfg',function(req,res,next){
	res.send({"result":{"id":"112080","security_s":"a6sj7vfd","room_id":"520227845","game_id":"96","game_key":"jpmj","info_s":"[{\"id\":200000,\"name\":\"Amang\",\"gold\":1152},{\"id\":200013,\"name\":\"\u9ed1\u591c\u5c0f\u5b9d\",\"gold\":-1152}]","head_s":"{\"200000\":{\"id\":200000,\"ting\":true,\"huaname\":\"\u6760\u59344 \u767d\u677f9 \u8d22\u795e4 \u676020 \u866b\u83496 \u7ea2\u4e2d1\",\"seat\":0,\"name\":\"Amang\",\"hname\":\"\",\"hua\":44,\"gold\":1152,\"gang\":0,\"type\":0,\"avatar\":\"http:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/DYAIOgq83eo7Qz73WZe7uzFGQ1RnIbGz8D69TRavIRZqGlraFHE4MEgCx2WhEUXgahHMNTprldZ7WwPmH7ZQ4g\/132\",\"ip\":\"60.180.136.205\"},\"200013\":{\"id\":200013,\"ting\":true,\"huaname\":\"\u6760\u59341 \u767d\u677f1 \u8d22\u795e4 \u676011 \u866b\u834910 \u53d1\u8d221\",\"seat\":1,\"name\":\"\u9ed1\u591c\u5c0f\u5b9d\",\"hname\":\"\",\"hua\":28,\"gold\":-1152,\"gang\":0,\"type\":0,\"avatar\":\"http:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTKelOFLhnNsaQu9mE5bgvIgFJSxLfRZBcPQ7icLa5ylI0cK5q627mD6YqHza6k5e8E2nR5DureRzNw\/132\",\"ip\":\"60.180.136.205\"}}","body_s":"0,1:[33, 38, 49, 49, 51, 52, 55, 56, 56, 56, 57, 65, 71, 81, 87, 101];1,1:[20, 22, 22, 23, 36, 37, 39, 49, 50, 53, 54, 55, 74, 84, 100, 103];0,12:54;1,26:[53, 100, 103]|[37, 25, 39];0,26:[87, 101]|[40, 68];1,2:74;1,3:55;0,2:34;0,3:33;1,2:84;1,3:49;0,5:49;0,3:34;1,26:98;1,2:40;1,3:50;0,2:50;0,3:38;1,26:102;1,2:17;1,3:40;0,2:17;0,3:40;1,2:22;1,3:36;0,2:24;0,3:17;1,2:68;1,3:37;0,26:87;0,2:81;0,3:24;1,2:57;1,3:37;0,2:25;0,3:25;1,2:55;1,3:57;0,26:87;0,2:68;0,3:71;1,2:36;1,3:55;0,2:35;0,3:35;1,2:24;1,3:36;0,2:81;0,3:65;1,2:20;1,3:39;0,2:21;0,3:21;1,2:71;1,3:39;0,2:18;0,3:18;1,2:55;1,3:55;0,2:84;0,3:57;1,2:24;1,3:25;0,2:51;0,3:55;1,2:18;1,3:17;0,2:33;0,3:33;1,2:21;1,3:18;0,2:41;0,3:41;1,2:20;1,3:21;0,26:99;0,2:35;0,3:35;1,2:33;1,3:33;0,2:41;0,3:41;1,2:38;1,3:38;0,2:36;0,3:36;1,2:40;1,3:40;0,2:49;0,6:49;0,2:36;0,3:36;1,2:52;1,3:24;0,2:41;0,3:41;1,2:84;1,3:24;0,2:65;0,3:65;1,2:51;1,3:52;0,2:35;0,3:35;1,2:52;1,3:51;0,5:51;0,3:50;1,2:54;1,3:23;0,2:74;0,3:74;1,5:74;1,3:52;0,2:21;0,3:21;1,2:35;1,3:35;0,2:19;0,3:19;1,2:39;1,3:39;0,2:34;0,3:34;1,2:19;1,3:19;0,2:33;0,3:33;1,2:17;1,3:17;0,2:38;0,3:38;1,2:71;1,3:71;0,2:34;0,3:34;1,2:52;1,3:71;0,2:24;0,3:24;1,2:25;1,3:52;0,26:53;0,2:81;0,8:81;0,2:23;0,3:23;1,2:19;1,3:25;0,2:17;0,3:17;1,26:87;1,2:23;1,3:23;0,2:65;0,3:65;1,2:18;1,3:18;0,26:97;0,26:53;0,2:37;0,3:37;1,2:23;1,3:23;0,2:54;0,3:52;1,2:50;1,3:50;0,2:54;0,3:68;1,2:57;1,3:68;0,2:39;0,3:68;1,2:22;1,8:22;1,2:21;1,3:57;0,2:18;0,3:18;1,2:20;1,8:20;1,2:71;1,3:71;0,2:57;0,3:84;1,5:84;1,3:19;0,2:56;0,8:56;0,2:74;0,3:39;1,26:96;1,2:38;1,6:84;1,2:65;1,3:65;0,2:51;0,6:51;0,2:37;0,3:37;1,2:50;1,3:50;0,2:41;0,3:74;1,2:40;1,3:21;","create_time":"2018-05-24 16:10:34","settlement":{"gold":"\u5206\u6570","hu":"\u80e1\u724c\u5206","laizi":"1","coinRate":"1","jingpin":true},"theme":"1"},"errCode":0,"resouce":{"name":"\u7cbe\u54c1\u9ebb\u5c06","descr":"\u7cbe\u54c1\u9ebb\u5c06","logo":"http:\/\/playback.thpcp.com\/replay_themes\/images\/5a7a65f278edd.png","codeimg":"http:\/\/playback.thpcp.com\/replay_themes\/images\/5a7a65f27898c.png","img":"http:\/\/playback.thpcp.com\/replay_themes\/images\/5b02816687444.jpg"},"referer":"","state":"fail"});
});

// router.get('/xfg',function(req,res,next){
	// res.send({"result":{"id":"1746","security_s":"8ulz19ux","room_id":"391268706","game_id":"96","game_key":"jpmj","info_s":"[{\"id\":200214,\"name\":\"More\",\"gold\":-114},{\"id\":200218,\"name\":\"\u4e50\u6e05\u7cbe\u54c1\u9ebb\u5c06\u5ba2\u670d\",\"gold\":114}]","head_s":"{\"200214\":{\"id\":200214,\"ting\":true,\"seat\":0,\"name\":\"More\",\"hname\":\"\u53cc\u8d22\u795e\u80e1\u50121 \u6760\u59341 \u767d\u677f1 \u5e73\u80e11 \u6e05\u4e00\u827275  \",\"gold\":-114,\"gang\":0,\"type\":1,\"avatar\":\"http:\/\/wx.qlogo.cn\/mmopen\/vi_32\/DYAIOgq83eqr51nPWAQ4frGFf1licso5LArPMjm9FVF0eeJODe1HVoaibXc6C30FPGoG8YPcscbHiasNZickJs4JBQ\/132\",\"ip\":\"114.243.255.67\"},\"200218\":{\"id\":200218,\"ting\":true,\"seat\":1,\"name\":\"\u4e50\u6e05\u7cbe\u54c1\u9ebb\u5c06\u5ba2\u670d\",\"hname\":\"\",\"gold\":114,\"gang\":0,\"type\":-1,\"avatar\":\"http:\/\/wx.qlogo.cn\/mmopen\/vi_32\/Pn0TUOeA3xic4vv207icDiaNjuibVyEywz4BeBh3kyic1xFZkvibBzqP3jjCtE1ydyDr5px94lkaiabDNrk2e8pKicB1ibw\/132\",\"ip\":\"112.17.237.60\"}}","body_s":"0,1:[17, 20, 21, 22, 23, 34, 37, 37, 40, 50, 51, 51, 53, 68, 84, 87];1,1:[18, 23, 25, 37, 37, 38, 50, 54, 65, 71, 81, 87, 87, 96, 99, 101];0,12:17;0,2:36;0,3:23;1,2:19;1,3:18;0,2:22;0,3:22;1,2:38;1,3:54;0,2:19;0,3:19;1,2:39;1,3:50;0,2:18;0,3:22;1,2:22;1,3:23;0,2:57;0,3:18;1,2:84;1,3:24;0,2:41;0,3:21;1,2:38;1,3:22;0,2:35;0,3:20;1,2:56;1,3:22;0,2:35;0,3:57;1,2:68;1,3:68;0,2:52;0,3:55;1,2:51;1,3:65;0,2:35;0,3:53;1,2:52;1,3:71;0,2:54;0,3:52;1,2:40;1,3:56;0,2:19;0,3:54;1,2:57;1,3:52;0,2:53;0,3:50;1,2:57;1,3:51;0,2:34;0,3:53;1,2:23;1,3:19;0,2:52;0,3:51;1,2:21;1,3:19;0,2:33;0,3:52;1,2:53;1,3:21;0,2:24;0,3:51;1,2:20;1,3:23;0,2:74;0,3:24;1,2:68;1,3:20;0,2:65;0,3:19;1,2:84;1,3:53;0,2:39;0,3:65;1,2:54;1,3:57;0,2:49;0,3:68;1,2:54;1,3:57;0,2:21;0,3:49;1,2:56;1,3:54;0,2:40;0,3:21;1,2:36;1,3:56;0,2:84;0,3:74;1,2:68;1,3:54;0,2:23;0,3:23;1,2:33;1,3:68;0,2:17;0,3:84;1,5:84;1,3:68;0,2:71;0,3:71;1,2:21;1,3:21;0,2:81;0,3:81;1,5:81;1,3:33;0,2:74;0,3:74;1,2:50;1,3:50;0,2:40;0,3:84;1,2:33;1,3:33;0,9:33;","create_time":"08:33","settlement":{"piao":"\u6f02\u724c\u5206","gang":"\u6760\u724c\u5206","gold":"\u5206\u6570","hu":"\u80e1\u724c\u5206","laizi":"1","coinRate":"1"},"theme":"1"},"errCode":0,"resouce":{"name":"\u7cbe\u54c1\u4e50\u6e05\u9ebb\u5c06\uff08\u6d4b\u8bd5\uff09","descr":"\u7cbe\u54c1\u4e50\u6e05\u9ebb\u5c06\uff08\u6d4b\u8bd5\uff09","logo":"http:\/\/playback.thpcp.com\/replay_themes\/images\/5a6054b8ae07d.png","codeimg":"http:\/\/playback.thpcp.com\/replay_themes\/images\/5a6054b8ad95e.png","img":"http:\/\/playback.thpcp.com\/replay_themes\/images\/5a6054b8af227.png"},"referer":"","state":"fail"});
// });

router.get('/doudizhu',function(req,res,next){
//	res.send({"result":{"id":"415756","security_s":"tev48l50","room_id":null,"game_id":"60","game_key":null,"info_s":null,"head_s":"{\"202181\":{\"id\":202181,\"seat\":0,\"name\":\"\\u529b\",\"gold\":3,\"avatar\":\"http:\\\/\\\/wx.qlogo.cn\\\/mmopen\\\/Q3auHgzwzM75L3Kq3icnvx8ZrtsYhnb2pJf5gK1wGLzmdJLHNia54viaFV6Alg3iatYQcVgNmXuLsxiaUL0yibYIsPs5RKYkRRgB3JW3ECOZOCs78\\\/0\",\"ip\":\"119.117.231.164\"},\"201606\":{\"id\":201606,\"seat\":2,\"name\":\"\\u738b\\u6587\\u4f1f\",\"gold\":-6,\"avatar\":\"http:\\\/\\\/wx.qlogo.cn\\\/mmopen\\\/oaHwJjFSFwIk808jzDUOibGr6kwFUiahlssEXJ8SOQPWXaHejMic7w6lBwQ0tc6lM2E1YkG0ibW2MM8picKicJrRAZyjODuEmSOibqT\\\/0\",\"ip\":\"110.6.133.61\"},\"201688\":{\"id\":201688,\"seat\":1,\"name\":\"\\ue437NO.1\",\"gold\":3,\"avatar\":\"http:\\\/\\\/wx.qlogo.cn\\\/mmopen\\\/oaHwJjFSFwIk808jzDUOibKEYBmh5F53uObficHz5sEecKl7LFj5B2rUUjnWiaWcHibp21OdrDUuuQeBacExJ8xe3snibssNjyAL7\\\/0\",\"ip\":\"182.204.172.4\"}}","body_s":"0,1:[60, 56, 25, 26, 24, 42, 71, 67, 70, 28, 19, 41, 97, 61, 30, 59, 21];1,1:[79, 74, 37, 68, 55, 78, 40, 38, 39, 27, 75, 73, 20, 36, 44, 57, 45];2,1:[63, 47, 53, 35, 51, 81, 77, 29, 31, 43, 52, 72, 54, 46, 76, 69, 23];0,2:0;1,2:0;2,2:3;2,3:[58, 62, 22];0,4:[1, 1, 1];2,5:[69]:1;0,5:[28]:1;1,5:[79]:1;2,5:[81]:1;0,5:[97]:1;1,6:0;2,6:0;0,5:[26, 25, 24, 71, 70, 21]:5;1,6:0;2,6:0;0,5:[56, 41, 42, 59, 60, 61, 30]:5;1,6:0;2,6:0;0,5:[19, 67]:2;","create_time":"08:33","settlement":{"gold":"\u5206\u6570","laizi":1},"theme":"1"},"errCode":0,"resouce":{"name":"\u76d8\u9526\u9ebb\u5c06","descr":"\u76d8\u9526\u9ebb\u5c06","logo":"http:\/\/www.areplay.com\/replay_themes\/images\/591a5778b2474.png","codeimg":"http:\/\/www.areplay.com\/replay_themes\/images\/591a5441e30ce.png","img":"http:\/\/www.areplay.com\/replay_themes\/images\/591a629928974.png"},"referer":"","state":"fail"});	
	//res.send({"result":{"id":"349","security_s":"8x9nwt7u","room_id":"205166446","game_id":"60","game_key":"nldld","info_s":"[{\"id\":200540,\"name\":\"\u6e38\u5ba2_200891\",\"gold\":96},{\"id\":200207,\"name\":\"\u674e\u5b501\",\"gold\":-48},{\"id\":200208,\"name\":\"\u674e\u5b502\",\"gold\":-48}]","head_s":"{\"200207\":{\"id\":200207,\"seat\":1,\"name\":\"\u674e\u5b501\",\"gold\":-48,\"avatar\":\"HS_9\",\"ip\":\"192.168.1.125\"},\"200208\":{\"id\":200208,\"seat\":2,\"name\":\"\u674e\u5b502\",\"gold\":-48,\"avatar\":\"HS_9\",\"ip\":\"192.168.1.125\"},\"200540\":{\"id\":200540,\"seat\":0,\"name\":\"\u6e38\u5ba2_200891\",\"gold\":96,\"avatar\":\"HS_9\",\"ip\":\"192.168.1.125\"}}","body_s":"0,1:[69, 73, 81, 37, 28, 31, 76, 42, 59, 44, 79, 74, 46, 71, 26, 60, 97];1,1:[68, 29, 43, 36, 35, 20, 72, 22, 55, 57, 77, 70, 51, 56, 67, 54, 47];2,1:[61, 30, 39, 25, 78, 23, 27, 53, 62, 52, 40, 21, 75, 58, 45, 41, 38];1,2:1;2,2:2;0,2:3;0,3:[19, 24, 63];0,4:[2, 2, 2];0,5:[59, 26, 73, 24, 71]:5;1,6:0;2,6:0;0,5:[69, 37]:2;1,5:[72, 56]:2;2,5:[27, 75]:2;0,5:[79, 63]:2;1,6:0;2,6:0;0,5:[19]:1;1,5:[55]:1;2,5:[41]:1;0,5:[46]:1;1,5:[47]:1;2,6:0;0,5:[60, 44, 28, 76]:4;1,6:0;2,6:0;0,5:[31]:1;1,6:0;2,6:0;0,5:[74, 42]:2;1,5:[29, 77]:2;2,5:[62, 30]:2;0,5:[97, 81]:7;","create_time":"08:33","settlement":{"landlord":"1"},"theme":"1"},"errCode":0,"resouce":{"name":"T4","descr":"\u6597\u5730\u4e3b","logo":"http:\/\/192.168.1.217\/replay_themes\/images\/5923dbe17ae8e.png","codeimg":"http:\/\/192.168.1.217\/replay_themes\/images\/5923dbe17a7bd.png","img":"http:\/\/192.168.1.217\/replay_themes\/images\/5923dbe17bd3c.png"},"referer":"","state":"fail"});
	//res.send({"result":{"id":"431","security_s":"gjg9uqkd","room_id":"210223531","game_id":"60","game_key":"nldld","info_s":"[{\"id\":200204,\"name\":\"\u674e\u5b50\",\"gold\":12},{\"id\":200207,\"name\":\"\u674e\u5b501\",\"gold\":-6},{\"id\":200540,\"name\":\"\u6e38\u5ba2_200891\",\"gold\":-6}]","head_s":"{\"200207\":{\"id\":200207,\"seat\":1,\"name\":\"\u674e\u5b501\",\"gold\":-6,\"avatar\":\"HS_9\",\"ip\":\"192.168.1.125\"},\"200204\":{\"id\":200204,\"seat\":0,\"name\":\"\u674e\u5b50\",\"gold\":12,\"avatar\":\"HS_9\",\"ip\":\"192.168.1.125\"},\"200540\":{\"id\":200540,\"seat\":2,\"name\":\"\u6e38\u5ba2_200891\",\"gold\":-6,\"avatar\":\"HS_9\",\"ip\":\"192.168.1.125\"}}","body_s":"0,1:[26, 59, 46, 31, 52, 43, 61, 23, 47, 97, 27, 21, 67, 81, 29, 45, 74];1,1:[36, 56, 55, 69, 24, 76, 63, 35, 39, 62, 68, 60, 20, 58, 28, 37, 53];2,1:[30, 41, 25, 42, 78, 38, 44, 79, 75, 71, 19, 57, 51, 73, 77, 22, 54];1,2:1;2,2:2;0,2:3;0,3:[72, 70, 40];0,5:[40, 23, 70, 21, 52, 67]:5;1,6:0;2,5:[78, 77, 44, 75, 42, 57]:5;0,6:0;1,6:0;2,5:[71, 22, 54, 38]:31;0,5:[27, 43, 59, 72]:31;1,5:[76, 60, 28, 35]:31;2,6:0;0,5:[46, 29, 45, 61]:31;1,6:0;2,6:0;0,5:[74, 26]:2;1,6:0;2,6:0;0,5:[97, 81]:7;1,6:0;2,6:0;0,5:[31, 47]:2;","create_time":"08:33","settlement":{"landlord":"1"},"theme":"1"},"errCode":0,"resouce":{"name":"test","descr":"\u6597\u5730\u4e3b","logo":"http:\/\/192.168.1.217\/replay_themes\/images\/5923dbe17ae8e.png","codeimg":"http:\/\/192.168.1.217\/replay_themes\/images\/5923dbe17a7bd.png","img":"http:\/\/192.168.1.217\/replay_themes\/images\/5923dbe17bd3c.png"},"referer":"","state":"fail"});
	res.send({"result":{"id":"470","security_s":"v9uf9fy5","room_id":"212703837","game_id":"60","game_key":"nldld","group_id":null,"use_num":null,"create_info":null,"info_s":"[{\"id\":200207,\"name\":\"\u674e\u5b501\",\"gold\":3},{\"id\":200208,\"name\":\"\u674e\u5b502\",\"gold\":3},{\"id\":200209,\"name\":\"\u674e\u5b503\",\"gold\":-6}]","head_s":"{\"200207\":{\"id\":200207,\"seat\":0,\"name\":\"\u674e\u5b501\",\"gold\":3,\"avatar\":\"HS_9\",\"ip\":\"192.168.1.8\"},\"200208\":{\"id\":200208,\"seat\":1,\"name\":\"\u674e\u5b502\",\"gold\":3,\"avatar\":\"HS_9\",\"ip\":\"192.168.1.8\"},\"200209\":{\"id\":200209,\"seat\":2,\"name\":\"\u674e\u5b503\",\"gold\":-6,\"avatar\":\"HS_9\",\"ip\":\"192.168.1.8\"}}","body_s":"0,1:[53, 71, 23, 27, 81, 30, 72, 54, 76, 19, 62, 60, 42, 35, 73, 37, 61];1,1:[52, 22, 79, 28, 47, 44, 26, 70, 68, 36, 63, 38, 69, 46, 39, 74, 24];2,1:[51, 29, 40, 78, 43, 55, 31, 57, 97, 25, 59, 58, 75, 67, 41, 45, 20];2,2:3;2,3:[56, 77, 21];0,4:[1, 1, 1];2,5:[51, 67]:2;0,5:[37, 53]:2;1,5:[74, 26]:2;2,5:[75, 59]:2;0,5:[76, 60]:2;1,5:[79, 47]:2;2,6:0;0,6:0;1,5:[69, 52, 68, 36]:31;2,5:[41, 57, 25, 20]:31;0,6:0;1,6:0;2,5:[21]:1;0,5:[54]:1;1,5:[39]:1;2,5:[58]:1;0,5:[27]:1;1,5:[46]:1;2,5:[31]:1;0,5:[81]:1;1,6:0;2,5:[97]:1;0,6:0;1,6:0;2,5:[55]:1;0,5:[72]:1;1,5:[63]:1;2,6:0;0,6:0;1,5:[24, 38, 22, 70]:31;2,5:[45, 29, 77, 43]:31;0,6:0;1,6:0;2,5:[56, 40]:2;0,5:[30, 62]:2;1,6:0;2,6:0;0,5:[19, 35]:2;1,5:[44, 28]:2;","create_time":"08:33","settlement":{"landlord":"1","gang":"\u6760\u724c\u5206","gold":"\u5206\u6570"},"theme":"1"},"errCode":0,"resouce":{"name":"test","descr":"\u6597\u5730\u4e3b111","logo":"http:\/\/192.168.1.217\/replay_themes\/images\/5923dbe17ae8e.png","codeimg":"http:\/\/192.168.1.217\/replay_themes\/images\/5923dbe17a7bd.png","img":"http:\/\/192.168.1.217\/replay_themes\/images\/5923dbe17bd3c.png"},"referer":"","state":"fail"});
});
//安卓APP请求测试
router.get('/api/app-startup',function(req,res,next){
	console.log(req.query.platform);
	res.send({
		title:'request success!'
	})
});

router.get("/", function (req,res) {
    var url = req.query.u;
    res.header("Content-Type", "text/html; charset=utf-8");
    superagent.get(url)
        .charset('gb2312')
        .end(function (err, sres) {
            var items = [];
            var hrefs = [];
            if (err) {
                console.log('ERR: ' + err);
                res.json({code: failCode, msg: err, sets:items});
                return;
            }
            var $ = cheerio.load(sres.text);
            $('body a').each(function(idx, element){
                var href = $(element).attr('href');
                var target = $(element).attr('target');
                if(target){
                  $(element).removeAttr('target');
                }
                $(element).attr('href', `/website/${href}`);
            });
            res.send(sres.text);
        });
});

router.get("/getspalist", function (req,res) {
    res.send({
		success: true,
		list:[0,12,3,3,5,6,5,56]
	});
});


router.post("/getspalist", function (req,res) {	
	//res.status(401);
    res.send({
		success: true,
		list:[-1,-1,-1,0,12,3,3,5,6,5,56]
	});	
});

const superagent = require('superagent');
const charset = require('superagent-charset');
charset(superagent);
const cheerio = require('cheerio');

var baseUrl = 'http://www.meizitu.com';
const successCode = 0, failCode = -1;

function isEmpty(obj){
    for (let i in obj){
        return false;
    }
    return true;
}

function uniqueArr(arr) {
    var rs = [];
    for (var i in arr) {
        if (rs.indexOf(arr[i]) != -1) {
            rs.push(arr[i]);
        }
    }
    return rs;
}

function inArr(v, arr) {
    var rs = false;
    for (var i in arr) {
        if (arr[i] == v) {
            rs = true;
            break;
        }
    }
    return rs;
}

router.get('/tags', function(req, res){
    res.header("Content-Type", "application/json; charset=utf-8");
    superagent.get(baseUrl)
        .charset('gb2312')
        .end(function (err, sres) {
            var items = [];
            var hrefs = [];
            if (err) {
                console.log('ERR: ' + err);
                res.json({code: failCode, msg: err, sets:items});
                return;
            }
            var $ = cheerio.load(sres.text);
            $('#container .tags span a').each(function (idx, element) {
                var $element = $(element);
                var hrefStr = $element.attr('href');
                var cid = hrefStr.match(/\/a\/(\w+)\.htm[l]?/);
                cid = isEmpty(cid) ? "" : cid[1];
                if (!inArr(hrefStr, hrefs)) {
                    hrefs.push(hrefStr);
                    items.push({
                        title : $element.text(),
                        href : hrefStr,
                        cid : cid
                    });
                }
            });
            res.send({code: successCode, msg: "", data:items});
        });
});


router.get('/girls', function(req, res){
    var cid = req.query.c;
    var mid = req.query.m;
    var page = req.query.p;
    cid = !isEmpty(cid) ? cid : '';
    page = !isEmpty(page) ? page : '1';
    var route = '/a/' + cid + (!isEmpty(mid) ? '_'+mid+'_'+page : '') + '.html';
    res.header("Content-Type", "application/json; charset=utf-8");
    // console.log(baseUrl+route);
    superagent.get(baseUrl+route)
        .charset('gb2312')
        .end(function (err, sres) {
            if (err) {
                console.log('ERR: ' + err);
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            $('#maincontent .inWrap ul li').each(function (idx, element) {
                var $element = $(element);
                var $subElement = $element.find('.pic a img');
                var thumbImgSrc = $subElement.attr('src');
                var titleEle = $subElement.attr('alt').match(/<b>(\w+)<\/b>/);
                items.push({
                    title : !isEmpty(titleEle) ? titleEle[1] : '',
                    href : $element.find('.pic a').attr('href'),
                    // largeSrc : isEmpty(thumbImgSrc) ? "" : thumbImgSrc.replace('limg', '01'),
                    largeSrc : thumbImgSrc,
                    thumbSrc : thumbImgSrc,
                    smallSrc : thumbImgSrc,
                });
            });
            $('#wp_page_numbers ul li').each(function (idx, element) {
                var $element = $(element);
                var $subElement = $element.find('a');
                var hrefElement = $subElement.attr('href');
                if (!isEmpty(hrefElement)) {
                    var midStr = $subElement.attr('href').match(/_(\d)_\d\.html/);
                    if (!isEmpty(midStr)) {
                        mid = midStr[1];
                        return false;
                    }
                }
            });
            res.json({code: successCode, msg: "", mid: mid, data:items});
        });
});

module.exports = router;