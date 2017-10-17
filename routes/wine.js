var express = require('express');
var router = express.Router();
var wine = require('../controllers/wine.js')

router.post('/wine_save',wine.save);

router.get('/wine_update',wine.update)

router.get('/wine_getbyid',wine.getbyid)

router.get('/wine_getArrByUser',wine.getArrByUser)

router.post('/wine_do',wine.do)

router.get('/test',function(req,res){
    res.send('dd')
})

module.exports = router

// res.header("Access-Control-Allow-Origin", "*");
// res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
// res.header("Access-Control-Allow-Headers", "X-Requested-With");
// res.header('Access-Control-Allow-Headers', 'Content-Type');