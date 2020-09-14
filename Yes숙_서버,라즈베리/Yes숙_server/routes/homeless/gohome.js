const express = require('express')
const router = express.Router()
const userModel = require('../../models/userModel')

router.get('/',function(req,res){
    var session = req.session
    console.log(session)
    userModel.showimg(session.passport.user)
    .then(function(result){
        console.log(result)
        var gohome = result[0].gohome
        var time = JSON.stringify(result[0].updated_at).substring(1,11)
        res.send(session.passport.name+'님의 귀향여비여부는 ' + gohome + '입니다 /// 발급받은날은' +'"'+time+'"')
    })
})

module.exports=router