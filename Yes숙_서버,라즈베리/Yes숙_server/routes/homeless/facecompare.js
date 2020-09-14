const express = require('express')
const router = express.Router()
const multer = require('multer')
const spawn = require('child_process').spawn

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log()
        if ( file.fieldname == 'face') {
            console.log("*********비교 얼굴 파일이 들어옵니다.")
            cb(null, 'compareface/')
        }else {console.log('잘못된 파일입니다')}
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

router.get('/',function(req,res){
    res.render('facecompare')
})

router.get('/',upload.fields([{name : 'face',maxCount:1}]),function(req,res,next){
    console.log('비교 얼굴사진 저장 완료')
    console.log(JSON.stringify(req.files))
    var faceimg_com = req.files.filename
    var process = spawn('python',["./facecompare.py",faceimg_com])

    process.stdout.on('data',function(data){
        var string = data.toString()
        console.log(string)
        var datasplit = string.split("'")
        var result = datasplit[1]
        console.log(result)
    })
})

module.exports=router