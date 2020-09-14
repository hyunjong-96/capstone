var express = require('express');
var router = express.Router();
//var admin = require('firebase-admin')
//var serviceAccount = require('../public/pushmessage-37f1f-firebase-adminsdk-h68yu-07e4aa106e.json')
const schedule = require('node-schedule')
var schtest = require('../public/schedule')
const functionModel = require('../models/function')
const pushModel = require('../models/pushModel')
const countfunction = require('../public/countfunction')
const topic_test= require('../public/wheathermessage')
/*


/* GET home page. */
router.get('/topicsend',function(req,res){
  topic_test()
})

router.get('/function', function (req, res) {
  res.render('function2')
})

router.post('/function', function (req, res) {
  console.log('function의 req.body : ', req.body)
  /*functionModel.creatfunctiontime(req.body)
    .then(function (result) {
      //result에서의 저장된 값 정보result._doc
      res.json(result)
    })
    .catch(function (err) {
      console.log(err)
      res.json(err)
    })*/
    pushModel.findOneAndUpdate({'name':req.body.name,'token':req.body.token},{$set:{'first':true}},function(err,success){
      if(err) return res.json(err)
      res.send(success)
    })
})

//기능을 눌렀을때 req가 들어와서 시간에 따라 cnt
router.post('/count', function (req, res) {
  functionModel.functioncount(req.body)
  .then(function(result){
    console.log('기능 카운트하기 >>> ',result)
    res.send(result)
  })
  .catch(function(err){
    console.log(err)
    res.send(err)
  })
  /*functionModel.max_cnt_function(req.body)
    .then(function (result) {
      var max_cnt_function = 0
      var max_function = ''
      for (i = 0; i < result[0].function.length; i++) {
        if (max_cnt_function < result[0].function[i].cnt_function) {
          max_cnt_function = result[0].function[i].cnt_function
          max_function = result[0].function[i].name_function
        }
      }
      console.log('user name >>> ', req.body.name)
      console.log('result >>>', result[0])
      console.log('max_cnt_function >>>>', max_cnt_function)
      console.log('max_function >>>>', max_function)
      functionModel.aggregate([
        { $unwind: '$function' },
        { $match: { 'token': req.body.token, 'function.name_function': req.body.function } },
        { $project: { max_time: { $arrayElemAt: ['$function.time.hour', { $indexOfArray: ['$function.time.cnt_time', { $max: '$function.time.cnt_time' }] }] } } }
      ])
        .then(function (result) {
          time = result[0].max_time
          console.log(time)
          schtest(req.body.token, time)
          res.send(result)
        })
        .catch(function (err) {
          res.send(err)
        })
    })
    .catch(function (err) {
      res.send(err)
    })*/
})

module.exports = router;
