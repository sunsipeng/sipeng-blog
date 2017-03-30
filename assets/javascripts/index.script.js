/**
 * Created by chancy on 2017/3/21.
 */

var homeContainer = new Vue({
    el: '#wrapper',
    data: {
        testData: "sp-server",
        messageInfo: '',
        navdata:[
            {title:'导航一'},
            {title:'导航二'},
            {title:'导航三'},
            {title:'导航四'},
            {title:'导航五'},
            {title:'导航六'}
        ]
    },
    methods:{
        getNavigator: function () {

        }
    }
});

homeContainer.getNavigator();