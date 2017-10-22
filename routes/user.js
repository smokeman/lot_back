var express = require('express');
var router = express.Router();
var user = require('../controllers/user.js')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('b.html');
  // res.send('respond with a resource');
});

router.get('/grantTo',user.grantTo)

router.get('/grantBoss',user.grantBoss)

module.exports = router;
