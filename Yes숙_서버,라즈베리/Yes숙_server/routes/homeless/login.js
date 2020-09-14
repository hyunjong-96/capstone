var express = require('express')
var router = express.Router()
const passport = require('passport')
var userModel = require('../../models/userModel')
const pushModel = require('../../models/pushModel')
const scheduling = require('../../public/countfunction')
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const { Worker, isMainThread } = require('worker_threads')
let myWorker1, myWorker2

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('file.filelname : ' + JSON.stringify(file))
        if (file.fieldname == 'face') {
            console.log('*******이미지 로그인*******')
            cb(null, 'compare/compareface/')
        } else if (file.fieldname == 'voice') {
            console.log('*******목소리 로그인*******')

            cb(null, 'compare/comparevoice/')
        }
    },
    filename: function (req, file, cb) {
        console.log(file)
        let extension = path.extname(file.originalname)
        let basename = path.basename(file.originalname, extension)
        filepath = basename + "-" + Date.now() + extension
        console.log(filepath)

        cb(null, basename + "-" + Date.now() + extension)
    },
})

let upload = multer({
    storage: storage
})
router.get('/find', function (req, res) {
    res.render('function')
})
router.post('/find', function (req, res) {
    userModel.find({ name: req.body.name })
        .then(function (result) {
            res.send(result)
        })
})

router.post('/', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        // console.log('info>>'+info.message)
        if (err != null || err) { return res.send('err' + info) }
        if (!user) {
            console.log(info)
            //res.redirect('/login')
            res.send('not user')
        }
        if (user) {
            console.log('serializeUser의 user>>' + user)
            req.login(user, function (err) {
                console.log(err)
                console.log('login후 user>>>' + user)
                //res.render('product')
                userModel.findlogin(user)
                    .then(function (user) {
                        res.send(user[0])
                    })
                    .catch(function (err) {
                        res.send('not user')
                    })
            })
        }
    })(req, res, next)
})

router.post('/FVlogin', upload.fields([{ name: 'face', maxCount: 1 }, { name: 'voice', maxCount: 1 }]), function (req, res) {
    // console.log('req.files >> ' + JSON.stringify(req.files))
    if (Object.keys(req.files)[0] == 'face') {
        var face = req.files.face[0].filename
        var facecompare_results
        console.log('<얼굴 로그인>')
        console.log('input user faceimg : ' + face)
        //childprocess값이 한국어 디코딩못함 배열에 폴더사진 저장하고 숫자(인덱스)로 부르기
        if (isMainThread) {
            myWorker1 = new Worker(__dirname + '/worker_facelogin.js', { workerData: face })
            myWorker1.on('message', function (result) {
                console.log('result type!!!!!!!!!!!!!!!! : ' + typeof (result))
                console.log('myWorker1 : ', result)
                userModel.login(result) //얼굴로그인한 결과값으로 유사 저장되어있는 사진의 사용자를 찾는다.
                    .then(function (results) {
                        console.log('얼굴로그인 결과 >>> ', results[0])
                        if (results[0] != 'undefined') {
                            pushModel.find({ 'name': results[0].name }) //
                                .then(function (result) {
                                    if (result[0].first != true) {
                                        console.log('pushMessage data >>> ', result)
                                        scheduling(result[0])
                                    }
                                    else{
                                        pushModel.findOneAndUpdate({'name':result[0].name,'token':result[0].token},{$set:{}})
                                        console.log(results[0].name,'은 첫사용자입니다.')
                                    }
                                })
                                .catch(function (err) {
                                    res.send(err)
                                })
                            res.send(results[0])
                        } else {
                            results = {
                                results: 'undefined'
                            }
                            console.log(results)
                            res.send(results)
                        }
                    })
                    .catch(function (err) {
                        console.log(err)
                        res.send(err)
                    })
            })
        } else {
            console.log('not face_main Thread!!!!!!!!!!!!!!!!!!!!!!!')
        }

    } else if (Object.keys(req.files)[0] == 'voice') {
        console.log('<목소리 로그인>')
        console.log('user voice : ' + req.files['voice'][0].filename)

        var voice = req.files['voice'][0].filename
        if (isMainThread) {
            fs.readdir('./voice', function (err, file_list) {
                console.log('folder_list : ' + file_list)

                myWorker2 = new Worker(__dirname + '/worker_voicelogin.js', { workerData: voice })
                myWorker2.on('message', function (result) {
                    var index = result
                    var voice_data = Number(index.object)

                    console.log('result : ' + index.object)
                    console.log('find user voice_file : ' + file_list[voice_data])
                    console.log('data accuracy : ' + index.accuracy)
                    console.log('data value : ' + index.value)

                    userModel.voicelogin(file_list[voice_data])
                        .then(function (result) {
                            console.log('목소리 로그인 결과 >>>', result[0])
                            pushModel.find({ 'name': result[0].name })
                                .then(function (result) {
                                    if(result[0]!=true){
                                        scheduling(result[0])
                                    }
                                    else{
                                        pushModel.findOneAndUpdate({'name':result[0].name , 'token':result[0].token},{$set:{'first':false}})
                                        .then(function(result){
                                            console.log('frist key값 수정 : ',result)
                                            console.log(result[0].name,'은 첫 사용자입니다.')
                                        })
                                        .catch(function(err){
                                            console.log(err)
                                        })
                                    }
                                })
                                .catch(function (err) {
                                    res.send(err)
                                })
                            res.send(result[0])
                        })
                        .catch(function (err) {
                            console.log(err)
                            res.send(err)
                        })
                })

            })
        } else {
            console.log('not voice_main thread!!!!!!!!!!!!!!!')
        }

    } else {
        console.log('다시 확인해주십시오')
        res.send('err')
    }
})

///////////////////////////////////////테스트 용///////////////////////////////

/*어플리케이션 용
router.post('/', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        // console.log('info>>'+info.message)
        if (err != null || err) { return res.send('err' + info) }
        if (!user) {
            console.log(info)
            return res.send('false');
        }
        if (user) {
            console.log('serializeUser의 user>>' + user)
            req.login(user, function (err) {
                console.log(err)
                console.log('hihi')
                res.send(req.session.passport.user)
            })
        }
    })(req, res, next)
})*/


module.exports = router