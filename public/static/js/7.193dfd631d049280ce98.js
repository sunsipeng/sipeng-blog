webpackJsonp([7],{bleq:function(t,e){},inyn:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={name:"DefaultRule",data:function(){return{groupRecordlist:[{groupId:"20036",groupName:"默认",remark:"123",gameName:"2012-1-1",roomConf:""},{roomid:"20036",dissolveManner:"默认",openHouse:"123",battleTime:"2012-1-1",userList:[{uname:"chancy",score:"30"},{uname:"target",score:"20"}]}],allLoaded:!1,bottomStatus:"123",wrapperHeight:0,pageCount:0}},mounted:function(){this.wrapperHeight=document.documentElement.clientHeight-this.$refs.wrapper.getBoundingClientRect().top},methods:{loadBottom:function(){var t=this;setTimeout(function(){if(t.pageCount++,t.pageCount<4)for(var e=1;e<=1;e++)t.groupRecordlist.push({roomid:"20036",dissolveManner:"默认",openHouse:"123",battleTime:"2012-1-1",userList:[{uname:"chancy",score:"30"},{uname:"target",score:"20"}]});else t.allLoaded=!0;t.$refs.loadmore.onBottomLoaded()},1500)},modifyGroupInfo:function(t){t&&this.$router.push({path:"/defaultrule/modify/"+t})},handleBottomChange:function(t){console.log(this.bottomStatus),this.bottomStatus=t}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-loadmore roomcard-container"},[t._m(0),t._v(" "),a("div",{ref:"wrapper",staticClass:"page-loadmore-wrapper",style:{height:t.wrapperHeight+"px"}},[a("mt-loadmore",{ref:"loadmore",attrs:{"bottom-method":t.loadBottom,"bottom-all-loaded":t.allLoaded},on:{"bottom-status-change":t.handleBottomChange}},[a("div",{staticClass:"mui-input-group"},[a("div",{staticClass:"mui-collapse-content"},t._l(t.groupRecordlist,function(e,o){return a("form",{key:o,staticClass:"mui-input-group",attrs:{onsubmit:"return false"}},[a("div",{staticClass:"mui-input-row clickable",on:{click:function(a){t.modifyGroupInfo(e.groupId)}}},[a("label",{staticClass:"input-title"},[t._v("群ID:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.groupId,expression:"grl.groupId"}],attrs:{type:"text",readonly:"readonly"},domProps:{value:e.groupId},on:{input:function(a){a.target.composing||t.$set(e,"groupId",a.target.value)}}}),t._v(" "),a("a",{staticClass:"clickable-arrow",attrs:{href:"javascript:void(0)"}},[a("span",{staticClass:"mui-icon mui-icon-arrowright"})])]),t._v(" "),a("div",{staticClass:"mui-input-row"},[a("label",{staticClass:"input-title"},[t._v("群名称:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.groupName,expression:"grl.groupName"}],attrs:{type:"text",readonly:"readonly"},domProps:{value:e.groupName},on:{input:function(a){a.target.composing||t.$set(e,"groupName",a.target.value)}}})]),t._v(" "),a("div",{staticClass:"mui-input-row"},[a("label",{staticClass:"input-title"},[t._v("游戏名称:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.gameName,expression:"grl.gameName"}],attrs:{type:"text",readonly:"readonly"},domProps:{value:e.gameName},on:{input:function(a){a.target.composing||t.$set(e,"gameName",a.target.value)}}})]),t._v(" "),a("div",{staticClass:"mui-input-row",staticStyle:{height:"auto"}},[a("label",{staticClass:"input-title",staticStyle:{width:"70%"}},[t._v("备注:")]),t._v(" "),a("div",{staticStyle:{height:"auto"}},[a("comp-textarea",{attrs:{readonly:"readonly",ellipsis:!0,max:1e3},model:{value:e.remark,callback:function(a){t.$set(e,"remark",a)},expression:"grl.remark"}})],1)]),t._v(" "),a("div",{staticClass:"bettle-record-userlist bold-text"},[t._v("房间配置")]),t._v(" "),a("div",{staticClass:"mui-input-row"},[a("label",{staticClass:"input-title"},[t._v("开房方式")]),t._v(" "),a("input",{attrs:{type:"text",readonly:"readonly",value:"群主开房"}})]),t._v(" "),a("div",{staticClass:"mui-input-row"},[a("label",{staticClass:"input-title"},[t._v("开房方式")]),t._v(" "),a("input",{attrs:{type:"text",readonly:"readonly",value:"群主开房"}})]),t._v(" "),a("div",{staticClass:"mui-input-row"},[a("label",{staticClass:"input-title"},[t._v("开房方式")]),t._v(" "),a("input",{attrs:{type:"text",readonly:"readonly",value:"群主开房"}})]),t._v(" "),a("div",{staticClass:"button-groups roommanage-button-group"},[a("mt-button",{attrs:{size:"large",type:"danger",plain:""}},[t._v("删除")])],1)])}))]),t._v(" "),a("div",{staticClass:"loadmore-prompt-message",style:{opacity:"pull"==t.bottomStatus?1:0}},[t._v("\n              "+t._s(t.allLoaded?"没有更多数据了":"上拉加载更多...")+"\n        ")]),t._v(" "),a("div",{staticClass:"mint-loadmore-bottom",attrs:{slot:"bottom"},slot:"bottom"},[a("span",{directives:[{name:"show",rawName:"v-show",value:"loading"!==t.bottomStatus,expression:"bottomStatus !== 'loading'"}],class:{"is-rotate":"drop"===t.bottomStatus}},[t._v("↑")]),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:"loading"===t.bottomStatus,expression:"bottomStatus === 'loading'"}]},[a("mt-spinner",{attrs:{type:"snake"}})],1)])])],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modular",attrs:{id:"sreachID"}},[e("div",{staticClass:"sreach"},[e("input",{staticClass:"search-input",attrs:{type:"text",placeholder:"请输入群ID"}}),this._v(" "),e("a",{staticClass:"mui-icon mui-icon-search addhover",attrs:{href:"javascript:void(0)"}})])])}]},i=a("VU/8")(o,s,!1,function(t){a("bleq")},"data-v-57df3bd4",null);e.default=i.exports}});