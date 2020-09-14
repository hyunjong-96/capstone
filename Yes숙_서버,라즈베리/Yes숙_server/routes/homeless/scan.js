const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const spawn = require('child_process').spawn
var Jimp = require("jimp");
var QrCode = require('qrcode-reader')
var fs = require('fs')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
            console.log('----------QR코드가 들어옵니다----------')
            cb(null, 'compare/scan_QRimg/')
        }
    },
    filename: function (req, file, cb) {
        let extension = path.extname(file.originalname)
        let basename = path.basename(file.fieldname, extension)
        console.log('들어온 파일 : '+file)
        console.log('QR코드 이름은 ' + basename + ', 확장자는 ' + extension)
        cb(null, basename + "-" + Date.now() + extension)
    }

})

let upload = multer({
    storage: storage
})

router.get('/',function(req,res){
    res.render('scan')
})

router.post('/', upload.single('qr'), function (req, res) {
    var QR = req.file.filename
    console.log('reqfile >> '+JSON.stringify(req.file))
    console.log(QR)
    console.log('qrpath >> ' + req.file.path)
    var process = spawn('python',["./featurematching.py",QR])

    process.stdout.on('data',function(data){
        var string = data.toString()
        var datasplit = string.split("'")
        console.log('toString : '+datasplit)
        console.log(datasplit[1])
        var result = datasplit[1]
        
        var buffer = fs.readFileSync('./QR_img/'+result);
        console.log(buffer)
        Jimp.read(buffer,function(err,image){
            if(err) throw err
            var qr = new QrCode()
            qr.callback = function(err,value){
                if(err) throw err
                console.log('value.result : '+value.result)
                //console.log('value : '+JSON.stringify(value))
            }
            qr.decode(image.bitmap)
        })
    })

    
})

module.exports = router