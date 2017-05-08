/**
 * Created by chancy on 2017/2/9.
 * 首页脚本文件
 */

var homeContainer = new Vue({
    el: '#homeContainer',
    data: {
       time: '2017-02-09',
       isError: false,
       errorMsg:'123',
       selectArray: [],
       workRecordArray: [],
       workRecordArrayUsers:[]
    },
    mounted: function(){

    },
    methods: {
        selectDate: function () {
            var _this = this;
            this.$http({
                method:'post',
                url:'/queryWorkRerord',
                body:{ queryTime:_this.time }, //post
                emulateJSON: true
            }).then(function(data){
                console.log('request success');
                var serverData = data.data;
                if(serverData.error){
                    _this.isError = true;
                    _this.errorMsg = serverData.error;
                    _this.hidePrompt();
                    return;
                }
                if(serverData.success){
                    //console.log(serverData.result);
                    _this.workRecordArray = serverData.result.dataArray;
                    //去重重复用户数据
                    var tempVar = serverData.result.dataArray.slice(0);
                    _this.workRecordArrayUsers = _this.undulpicate(tempVar);
                }
            },function(error){
                _this.isError = true;
                _this.errorMsg = '服务器内部错误，请稍后重试！';
                _this.hidePrompt();
                console.log('request error !!');
            });
        },
        /**
         * 获取首页数据
         */
        getIndexData: function () {
            var _this = this;
            this.$http({
                method:'post',
                url:'/getIndexData',
                body:{}, //post
                emulateJSON: true
            }).then(function(data){
                console.log('request success');
                var serverData = data.data;
                if(serverData.error){
                    _this.isError = true;
                    _this.errorMsg = serverData.error;
                    _this.hidePrompt();
                    return;
                }
                if(serverData.success){
                    _this.selectArray = serverData.result.dateArray;
                    _this.workRecordArray = serverData.result.dataArray == undefined ? '' : serverData.result.dataArray;
                    //添加时间
                    _this.time = serverData.result.dateArray[serverData.result.dateArray.length-1];
                    //去重重复用户数据
                    //console.log(serverData.result);
                    var tempVar = serverData.result.dataArray.slice(0);
                    _this.workRecordArrayUsers = _this.undulpicate(tempVar);
                }
            },function(error){
                _this.isError = true;
                _this.errorMsg = '服务器内部错误，请稍后重试！';
                _this.hidePrompt();
                console.log('request error !!');
            });
        },
        /**
         * 人员评分
         * @param flag
         */
        setScore: function (flag,workId,uname,createTime,scored,scoreId) {
            console.log(scored?scored:'');
            var _this = this;
            if(!scored){
                console.log(createTime);
                this.$http({
                    method:'post',
                    url:'/employeeScore',
                    body:{scoreFlag: flag,workId: workId,uname:uname,createTime:new Date(createTime).getTime(),scoreId:scoreId}, //post
                    emulateJSON: true
                }).then(function(data){
                    console.log('request success');
                    var serverData = data.data;
                    if ( serverData.error ) {
                        _this.isError = true;
                        _this.errorMsg = serverData.error;
                        _this.hidePrompt();
                        return false;
                    }
                    _this.isError = true;
                    _this.errorMsg = serverData.success;
                    setTimeout(function () {
                        window.location.reload();
                    },500);
                    _this.hidePrompt();

                    console.log(serverData);
                },function(error){
                    _this.isError = true;
                    _this.errorMsg = '服务器内部错误，请稍后重试！';
                    _this.hidePrompt();
                    console.log('request error !!');
                });
            }else{
                _this.isError = true;
                _this.errorMsg = '不能重复评价相同的人!';
                _this.hidePrompt();
            }
        },
        /**
         * 获取人员当天工作记录
         */
        getWorkRecordByUserId: function (uid,userName) {
            //console.log(uid +' time:'+this.time);
            var _this = this;
            this.$http({
                method:'post',
                url:'/queryWorkRerordByUserId',
                body:{uid:uid,date:_this.time,userName:userName}, //post
                emulateJSON: true
            }).then(function(data){
                console.log('request success');
                var serverData = data.data;
                if ( serverData.error ) {
                    _this.isError = true;
                    _this.errorMsg = serverData.error;
                    _this.hidePrompt();
                    return false;
                }

                if(serverData.success){
                    _this.workRecordArray = serverData.result.dataArray;
                }

                //_this.isError = true;
                //_this.errorMsg = serverData.success;
                //_this.hidePrompt();

                //console.log(serverData);
            },function(error){
                _this.isError = true;
                _this.errorMsg = '服务器内部错误，请稍后重试！';
                _this.hidePrompt();
                console.log('request error !!');
            });
        },
        /**
         * 数组去重
         */
        undulpicate: function(array) {
            for(var i=0;i<array.length;i++) {
                for(var j=i+1;j<array.length;j++) {
                    if(array[i].user_id===array[j].user_id) {
                        array.splice(j,1);//删除重负
                        j--;
                    }
                }
            }
            return array;
        },
        hidePrompt: function(){
            setTimeout(function(){
                this.isError = false;
            }.bind(this),2000);
        },
        dom: function (id) {
            return document.getElementById(id);
        },
        /**
         * 获取当前时间（format）
         */
        getNowFormatDate: function() {
            var date = new Date();
            var seperator1 = "-";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
            return currentdate;
        }
    }
});

homeContainer.getIndexData();