/**
 * Created by chancy on 2017/4/26.
 * 请假JS处理
 */
var Furlough = new Vue({
    el: '#furloughContainer',
    data: {
        isShow: true,
        isError: false,
        furloughArray:[],
        pagination:[],
        errorMsg:'',
        pagination: [],
        pageNumber: 1
    },
    methods: {
        getFurloughAll: function(){
            var _this = this;
            this.$http({
                method:'post',
                url:'/getFurloughAll',
                body:{ }, //post
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
                //console.log(serverData);
                if(serverData.success){
                    //console.log(serverData.result);
                    _this.furloughArray = serverData.furloughData;

                    //设置分页
                    var furloughDataLen = Math.ceil(serverData.furloughData.length/5);
                    furloughDataLen = furloughDataLen == 0 ? _this.isShow = false : furloughDataLen;
                    for (var ii = 0; ii<furloughDataLen; ii++) {
                        _this.pagination.push({
                            index: ii+1,
                            active: ii == 0 ? 'active' : ''
                        });
                    }

                    _this.furloughArray = [];
                    var tempArray = null;

                    serverData.furloughData.length < 5 ? tempArray = serverData.furloughData : tempArray = [0,0,0,0,0];
                    tempArray.forEach(function (data,index) {
                        _this.furloughArray.push(serverData.furloughData[index])
                    });
                }
            },function(error){
                _this.isError = true;
                _this.errorMsg = '服务器内部错误，请稍后重试！';
                _this.hidePrompt();
                console.log('request error !!');
            });
        },
        furloughAudit: function (fid,flag) {
           if(confirm('你确定审核该条数据吗？')){
               var _this = this;
               this.$http({
                   method:'post',
                   url:'/auditFurlough',
                   body:{ fid:fid, flag:flag }, //post
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
                   //console.log(serverData);
                   if(serverData.success){
                       //console.log(serverData.result);
                       _this.isError = true;
                       _this.errorMsg = serverData.success;
                       _this.hidePrompt();
                       setTimeout(function () {
                           window.location.reload();
                       },1000);
                   }
               },function(error){
                   _this.isError = true;
                   _this.errorMsg = '服务器内部错误，请稍后重试！';
                   _this.hidePrompt();
                   console.log('request error !!');
               });
           }
        },
        unsure: function () {
            var _this = this;
            this.$http({
                method:'post',
                url:'/checkPending',
                body:{ }, //post
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
                //console.log(serverData);
                if(serverData.success){
                    //console.log(serverData.result);
                    _this.furloughArray = serverData.furloughData;
                    _this.isShow = false;
                }
            },function(error){
                _this.isError = true;
                _this.errorMsg = '服务器内部错误，请稍后重试！';
                _this.hidePrompt();
                console.log('request error !!');
            });
        },
        /**
         * 分页
         */
        paginationHandle: function (flag,pageNum) {
            if (flag == 'next') {
                this.pageNumber++;
                if (this.pageNumber >= this.pagination.length){
                    this.pageNumber = this.pagination.length;
                } else {

                }
                this.changePagtionStyle(this.pageNumber);
                this.requestServer(this.pageNumber);
            } else if(flag == 'prev') {
                this.pageNumber--;
                if (this.pageNumber <= 1) {
                    this.pageNumber = 1;
                }

                this.changePagtionStyle(this.pageNumber);
                this.requestServer(this.pageNumber);
            } else if(flag == 'jump'){
                this.pageNumber = pageNum;
                this.changePagtionStyle(this.pageNumber);
                this.requestServer(pageNum);
            }
        },
        changePagtionStyle: function (_index) {
            this.pagination.forEach(function (data) {
                if (data.index == _index) {
                    data.active = 'active';
                } else {
                    data.active = '';
                }
            });
        },
        requestServer: function (pageNum) {
            //console.log(this.pageNumber);

            var _this = this;
            this.$http({
                method:'post',
                url:'/furloughPagination',
                body:{ pageNum: pageNum }, //post
                emulateJSON: true
            }).then(function(data){
                var serverData = data.data;
                if(serverData.error){
                    return console.log(serverData.error);
                }
                if(serverData.success){
                    _this.furloughArray = serverData.furloughData;
                    console.log('查询成功!');
                }
            },function(error){
                _this.isError = true;
                _this.errorMsg = '服务器内部错误，请稍后重试！';
                _this.hidePrompt();
                console.log('request error !!');
            });
        },
        hidePrompt: function(){
            setTimeout(function(){
                this.isError = false;
            }.bind(this),2000);
        }
    }
});

Furlough.getFurloughAll();