const express = require('express')
const router = express.Router()
const FCModel = require('../../models/foodcountModel')
const multer = require('multer')
const path = require('path')
const spawn = require('child_process').spawn
var Jimp = require("jimp");
var QrCode = require('qrcode-reader')
var fs = require('fs')
var filepath
const { Worker, isMainThread } = require('worker_threads')
let myworker1

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('Qrcode in!!')
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
            console.log("*********이미지 파일이 들어옵니다.")
            cb(null, 'compare/scan_QRimg/')
        }
    },
    filename: function (req, file, cb) {
        console.log(file)
        let extension = path.extname(file.originalname)
        let basename = path.basename(file.fieldname, extension)
        filepath = basename + "-" + Date.now() + extension
        console.log('filepath : ' + filepath)

        cb(null, basename + "-" + Date.now() + extension)
    },
})

let upload = multer({
    storage: storage
})

router.get('/nowcount', function (req, res) { //현재 밥양 보여주기
    console.log(req.query.name)
    FCModel.foodCount(req.query)
        .then(function (result) {
            console.log(result)
            var nowNum = String(result[0].foodCount)
            res.send(nowNum)
        })
        .catch(function (err) {
            res.status(500).send(err)
        })
})

router.post('/insertfood', function (req, res) { //급식소에서 오늘의 밥양 저장
    var data = req.body
    console.log('data : ' + JSON.stringify(data))
    FCModel.insertFood(data.name, data.food)
        .then(function (result) {
            console.log(result)
            console.log('insert succes!')
            res.send(result)
        })
        .catch(function (err) {
            console.log(err)
            res.send('insertFood Err')
        })
})

router.get('/foodcount', function (req, res) {
    res.render('manager/foodcountQR')
})

router.post('/foodcount', upload.single('qr'), function (req, res) { //qr코드를 찍으면 밥양이 하나씩 줄어듬
    console.log('foodcount QRcode >> ' + JSON.stringify(req.file))
    console.log('사용자 타입 : ' + typeof (req.body))
    console.log('사용자1  : ', req.body)

        if (isMainThread) {
            var QR = req.file.filename
            console.log('QR : ', QR)
            myworker1 = new Worker(__dirname + '/worker_qrscan.js', { workerData: QR })
            //비교되어 동일한QR의 파일이름을 조건문으로해서 count시켜줘야함 
            myworker1.on('message', function (data) {
                console.log('피쳐매칭 결과 : ', data)
                console.log('type : ' + typeof (data))
                /*console.log('비교된 qrcode : ' + data.toString())
                var string = data.toString()
                var datasplit = string.split("'")
                var results = datasplit[1]
                console.log('results : ' + results)*/
    
                var buffer = fs.readFileSync('./QR_img/' + data);
                console.log(buffer)
                Jimp.read(buffer, function (err, image) {
                    if (err) res.send(err)
                    var qr = new QrCode()
                    qr.callback = function (err, value) {
                        if (err) res.send(err)
                        var json = JSON.parse(value.result)
                        console.log('type : ' + typeof (json))
                        console.log('name : ' + json.name)
                        console.log('value.result : ' + JSON.stringify(json))
                        //console.log('value : '+JSON.stringify(value))
    
                        FCModel.foodCount(req.body)
                            .then(function (result) {
                                var count = result[0].foodCount
                                count = count - 1
                                console.log('foodcount result : ' + result)
    
                                FCModel.countUpdate(result, count)
                                    .then(function (result) {
                                        console.log('update성공')
                                        console.log('>>>>>>>>>>>' + result)
                                        console.log('req.body.name  : ' + req.body.name)
    
                                        FCModel.foodCount(req.body)
                                            .then(function (result) {
                                                console.log('update불러오기')
                                                console.log(typeof (result[0].foodCount))
                                                var countNum = (result[0].foodCount).toString()
                                                console.log(countNum)
                                                res.send(countNum)
                                            })
                                            .catch(function (err) {
                                                console.log('update불러오기실패')
                                                res.status(500).send(err)
                                            })
                                    })
                                    .catch(function (err) {
                                        console.log('update실패')
                                    })
                            })
                            .catch(function (err) {
                                console.log('post[FF_COUNT]-----------------실패')
                                res.status(500).send(err)
                            })
                    }
                    qr.decode(image.bitmap)
                })
    
            })
        }
})

module.exports = router