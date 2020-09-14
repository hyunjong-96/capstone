const express = require('express')
const router = express.Router()
const fileModel = require('../models/fileModel')

router.get('/', function (req,res) {
    res.render('choosename')
})

router.post('/',function(req,res){
    fileModel.showimg(req.body)
    .then(function(result){
        var img = result[0]
        console.log(result[0])
        res.render('filedownload',{results : img})
    })

})

module.exports = router
