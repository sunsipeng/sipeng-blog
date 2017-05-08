/**
 * Created by chancy on 2017/2/13.
 */
var invoiceContainer = new Vue({
    el: '#invoiceContainer',
    data: {
        time: '2017-02-09',
        isError: false,
        errorMsg: '123',
        selectArray: [],
        invoiceArray: [{}],
        pagination: [],
        pageNumber: 1,
        isShow: true
    },
    methods: {
        selectDate: function () {
            console.log('come in');
            var _this = this;
            this.$http({
                method:'post',
                url:'/queryInvoiceByCreateTime',
                body:{ create_time:_this.time }, //post
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
                console.log(serverData);
                if(serverData.success){
                    //console.log(serverData.result);
                    _this.invoiceArray = serverData.result.dataArray;
                }
            },function(error){
                _this.isError = true;
                _this.errorMsg = '服务器内部错误，请稍后重试！';
                _this.hidePrompt();
                console.log('request error !!');
            });
        },
        getInvoiceData: function () {
            var _this = this;
            this.$http({
                method:'post',
                url:'/getInvoiceData',
                body:{ queryTime:_this.time }, //post
                emulateJSON: true
            }).then(function(data){
                console.log('request success');
                var serverData = data.data;
                //console.log(serverData);
                if(serverData.error){
                    _this.isError = true;
                    _this.errorMsg = serverData.error;
                    _this.hidePrompt();
                    return;
                }
                if(serverData.success){
                    //console.log(serverData.result);
                    //_this.selectArray = serverData.result.dateArray;
                    //_this.time =  serverData.result.dateArray[serverData.result.dateArray.length-1];

                    //设置分页
                    var invoiceDataLen = Math.ceil(serverData.result.dataArray.length/5);
                    invoiceDataLen = invoiceDataLen == 0 ? _this.isShow = false : invoiceDataLen;
                    for (var ii = 0; ii<invoiceDataLen; ii++) {
                        _this.pagination.push({
                            index: ii+1,
                            active: ii == 0 ? 'active' : ''
                        });
                    }

                    _this.invoiceArray = [];
                    var tempArray = null;

                    serverData.result.dataArray.length < 5 ? tempArray = serverData.result.dataArray : tempArray = [0,0,0,0,0];
                    tempArray.forEach(function (data,index) {
                        _this.invoiceArray.push(serverData.result.dataArray[index])
                    });

                    console.log('数据条数：' +serverData.result.dataArray.length);
                    //_this.invoiceArray = serverData.result.dataArray;
                }
            },function(error){
                _this.isError = true;
                _this.errorMsg = '服务器内部错误，请稍后重试！';
                _this.hidePrompt();
                console.log('request error !!');
            });
        },
        /**
         * 查询未确认的发票数据
         */
        unsure: function () {
            var _this = this;
            this.$http({
                method:'post',
                url:'/unsureInvoice',
                body:{  }, //post
                emulateJSON: true
            }).then(function(data){
                console.log('request success');
                var serverData = data.data;
                //console.log(serverData);
                if(serverData.error){
                    _this.isError = true;
                    _this.errorMsg = serverData.error;
                    _this.hidePrompt();
                    return;
                }
                if(serverData.success){
                    //console.log(serverData.result);
                    _this.isShow = false;
                    _this.invoiceArray = serverData.result.dataArray;
                }
            },function(error){
                _this.isError = true;
                _this.errorMsg = '服务器内部错误，请稍后重试！';
                _this.hidePrompt();
                console.log('request error !!');
            });
        },
        /**
         * 我的发票
         */
        myInvoice: function () {
            var _this = this;
            this.$http({
                method:'post',
                url:'/myInvoice',
                body:{  }, //post
                emulateJSON: true
            }).then(function(data){
                console.log('request success');
                var serverData = data.data;
                //console.log(serverData);
                if(serverData.error){
                    _this.isError = true;
                    _this.errorMsg = serverData.error;
                    _this.hidePrompt();
                    return;
                }
                if(serverData.success){
                    //console.log(serverData.result);
                    _this.isShow = false;
                    _this.invoiceArray = serverData.result.dataArray;
                }
            },function(error){
                _this.isError = true;
                _this.errorMsg = '服务器内部错误，请稍后重试！';
                _this.hidePrompt();
                console.log('request error !!');
            });
            console.log('我的发票');
        },
        /**
         * 确认发票
         */
        sureInvoice: function (id) {
            //invoiceId
           if(confirm('您确定要确认发票？')){
               var _this = this;
               this.$http({
                   method:'post',
                   url:'/sureInvoice',
                   body:{ invoiceId:id }, //post
                   emulateJSON: true
               }).then(function(data){
                   console.log('request success');
                   var serverData = data.data;
                   console.log(serverData);
                   if(serverData.error){
                       return console.log(serverData.error);
                   }
                   if(serverData.success){
                       alert(serverData.success);
                       window.location.reload();
                   }
               },function(error){
                   _this.isError = true;
                   _this.errorMsg = '服务器内部错误，请稍后重试！';
                   _this.hidePrompt();
                   console.log('request error !!');
               });
           }
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
                url:'/invoicePagination',
                body:{ pageNum: pageNum }, //post
                emulateJSON: true
            }).then(function(data){
                var serverData = data.data;
                if(serverData.error){
                    return console.log(serverData.error);
                }
                if(serverData.success){
                   _this.invoiceArray = serverData.result;
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

invoiceContainer.getInvoiceData();


