var express = require('express');
var router = express.Router();
var positionModel = require('../dbSchema/positionModel')

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('map!')
    res.render('map');
});

router.get('/data.json', function (req, res, next) {
    console.log('jsonData : ', req)
    positionModel.find({}, function (err, positions) {
        console.log(positions)
        res.send(positions)
    })
})

router.post('/data.json', function (req, res, next) {
    var order = parseInt(JSON.parse(req.body.orderData).order)
    console.log('jsonData : ', typeof order)
    positionModel.find({'ct': order}, function (err, positions) {
        console.log(positions)
        res.send(positions)
    })
})


module.exports = router;
