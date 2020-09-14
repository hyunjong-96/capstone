const express = require('express')
const router = express.Router()
const manageModel = require('../../models/manageModel')
const FCModel = require('../../models/foodcountModel')

router.get('/',function(req,res){
    res.render('homeless/signup')
})

router.get('/login',function(req,res){
    console.log('manager session >>>'+ JSON.stringify(req.session))
    res.render('manager/login')
})

router.post('/login',function(req,res,next){
    console.log(req.body)
    manageModel.findPlace(req.body.name)
    .then(function(result){
        console.log('>>>>>'+result[0].foodPlace)
        console.log(result)
        res.send(result[0])
    })
    .catch(function(err){
        res.status(500).send(err)
    })
})
    
    

router.post('/signUp',function(req,res){
    console.log(req.body)
    //var data = JSON.parse(req.body)
    //console.log(data)
    manageModel.signUp(req.body)
    .then(function(result){
        console.log(result[0])
        res.send(result)
    })
    .catch(function(err){
        res.status(500).send(err)
    })
})

module.exports = router