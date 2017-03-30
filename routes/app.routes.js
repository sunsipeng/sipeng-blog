/**
 * Created by chancy on 2017/3/11.
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req,res,next) {
    res.render('index',{
        title: 'app page'
    });
});

module.exports = router;