/**
 * Created by chancy on 2017/2/27.
 * 工作中
 */

var workingContainer = new Vue({
    el: '#workIngContainer',
    data:{
        isShowDone: false,
        isDisable:true,
        isError:false,
        errorMsg:'',
        content:'',
    },
    methods:{
        editHandle: function () {
            this.isShowDone = true;
            this.isDisable = false;
        },
        submitWorkRecord: function (uname,workId) {
            var _this = this;
            var _content = document.getElementById('workContent').value;
            this.$http({
                method:'post',
                url:'/editWorkingRecord',
                body:{uname: uname,workId: workId,content:_content}, //post
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
        },
        hidePrompt: function(){
            setTimeout(function(){
                this.isError = false;
            }.bind(this),2000);
        }
    }
});