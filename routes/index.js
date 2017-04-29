var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/master', function (req,res,next) {
  res.json({
    message:'this is interface for test.'
  });
});

module.exports = router;
