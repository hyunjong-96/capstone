const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
var filepath

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var p = `__dirname/../public/foodimg/${req.body.name}.jpg`
        fs.stat(p, function (err) {
            console.log('err : ',err)
            if(!err){
                console.log('파일존재')
                fs.unlink(`${p}`,function(err){
                    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
                        console.log("*********음식 사진이 들어옵니다.")
                        cb(null, `public/foodimg/`)
                    }
                })
            }
            else if(err.code==='ENOENT'){
                if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
                    console.log("*********음식 사진이 들어옵니다.")
                    cb(null, `public/foodimg/`)
                }
            }
           /*if (err.code === 'ENOENT') {    //폴더안 파일 존재 x
                console.log('foodimg in!')
                if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
                    console.log("*********음식 사진이 들어옵니다.")
                    cb(null, `public/${req.body.name}/`)
                }
            } else if (!err) { //폴더안 파일 존재 o
                console.log('foodimg in!')
                if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
                    console.log("*********음식 사진이 들어옵니다.")
                    cb(null, `public/${req.body.name}/`)
                }
            }*/
        })
    },
    filename: function (req, file, cb) {
        console.log('foodimg file', file)
        let extension = path.extname(file.originalname)
        let basename = path.basename(file.fieldname, extension)
        filepath = `${req.body.name}`+extension
        console.log('filepath : ', filepath)

        cb(null, filepath)
    }
})

let upload = multer({
    storage: storage
})

/*router.get('/',function(req,res){
    var name = '만수종합사회복지관'
    var p = `__dirname/../public/foodimg/${name}.jpg`
    fs.stat(p,function(err){
        console.log(err)
        if(!err){   //파일존재
            console.log('파일존재')
            fs.unlink(`${p}`,function(err){
                console.log('파일삭제')
                console.log('foodimg 저장')
            })
        }
        else if(err.code==='ENOENT'){ //파일존재x
            console.log('파일존재x')
            console.log('foodimg 저장')
        }
    })
})*/

router.post('/', upload.single('menu'), function (req, res) {
    console.log('foodimg >>> ', req.file)
    console.log('foodbody >>> ', req.body)
    res.send('successful')
})

module.exports = router