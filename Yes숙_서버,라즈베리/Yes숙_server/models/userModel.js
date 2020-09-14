//var mongoose = require('mongoose')
//var Schema = mongoose.Schema
const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '-'
    },
    year: {
        type: String,
        default: '-'
    },
    sex: {
        type: String,
        //require: true
        default : '-'
    },
    gohome: {
        type: Boolean,
        default: false
    },
    QR: {
        type: String
    },
    Faceimg: {
        type: String
    },
    Voice:{
        type: String
    },
    created_at: { type: Date, index: { unique: false }, default: Date.now() },
    updated_at: { type: Date, index: { unique: false }, default: Date.now() }
})

userSchema.static('showimg', function (name) {
    return this.find({ name: name.name })
})

userSchema.static('findlogin', function (data) {
    return this.find({$and:[{ name: data.name}, {year: data.year }]})
})

userSchema.static('login',function(file){
    return this.find({Faceimg : file})
})

userSchema.static('voicelogin',function(name){
    return this.find({name : name})
})

userSchema.method('comparePassword', function (inputPassword, cb) {
    console.log('inpupw>>>' + inputPassword)
    if (inputPassword == this.year) {
        cb(null, true)
    } else {
        cb(null, false)
    }
})//비밀번호를 평문끼리 비교하는데 이러면 안되고 시간있을때 암호화 공부하기*

userSchema.static('signUp', function (QR, Faceimg, Voice, data) {
    var signUp = new this({
        name: data.name,
        year: data.year,
        sex: data.sex,
        gohome : false,
        QR: QR,
        Faceimg: Faceimg,
        Voice:Voice
        })
    return signUp.save()
})

const userModel = mongoose.model('homlesspeoples', userSchema)

module.exports = userModel