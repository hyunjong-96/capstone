const express = require('express')
const router = express.Router()
const userModel = require('../../models/userModel')
const pushModel = require('../../models/pushModel')
const multer = require('multer')
const path = require('path')
var filepath
const mkdirp = require('mkdirp')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname == 'face') {
            console.log("*********이미지 파일이 들어옵니다.")
            cb(null, 'face/')
        } else if (file.mimetype == 'audio/mp3' || file.mimetype == 'audio/wav' || file.mimetype == 'audio/wave') {
            console.log("*********목소리 파일이 들어옵니다.")
            console.log('name : ',req.body.json)    //name 파라미터 req.body.json.name
            var json = JSON.parse(req.body.json)
            console.log('name2 : ',json.name)
            //console.log('name : '+Object.values(req) )
          
            mkdirp('./voice/' + json.name).then(function (made) {    //app기준의 경로
                console.log(`${made} 에 폴더생성!`)
                cb(null, `voice/${json.name}/`)
            })
        } else if (file.fieldname == 'qr') {
            console.log("*********이미지 파일이 들어옵니다.")

            cb(null, 'QR_img/')
        }
    },
    filename: function (req, file, cb) {
        console.log(file)
        let extension = path.extname(file.originalname)
        let basename = path.basename(file.originalname, extension)
        filepath = basename + "-" + Date.now() + extension

        cb(null, basename + "-" + Date.now() + extension)
    },
})

let upload = multer({
    storage: storage
})

router.get('/', function (req, res, next) {
    console.log("*******fileupload 페이지")
    res.render('homeless/signup')
})

router.post('/', upload.fields([{ name: 'face', maxCount: 1 }, { name: 'qr', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), function (req, res, next) {
    console.log("********회원가입 가쥬아~")
    var body = req.body
    console.log(JSON.stringify(req.files))

    var reqData = JSON.parse(body.json)
    var QR = req.files['qr'][0].filename
    var Face = req.files['face'][0].filename
    var Voice = req.files['audio'][0].filename

    console.log('QR' + QR)
    console.log('Face' + Face)
    console.log('Voice' + Voice)
    console.log(reqData)

    userModel.signUp(QR, Face, Voice, reqData)
        .then(function (result) {
            console.log('회원가입성공')
            console.log(result)
            res.send('successful!')
        })
        .catch(function (err) {
            console.log('회원가입실패')
            console.log(err)
            res.send('err!')
        })

    pushModel.createPush(reqData)
        .then(function(result){
            console.log('token생성 성공',result)
            res.send(result)
        })
        .then(function(err){
            console.log('toekn생성 실패',err)
            res.send(err)
        })
})


module.exports = router