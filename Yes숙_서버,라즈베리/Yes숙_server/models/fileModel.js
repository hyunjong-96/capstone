const mongoose = require('mongoose')
const Schema = mongoose.Schema

var fileSchema = new Schema({
    name : {
        type : String,
        default : '-'
    },
    year : {
        type : Number,
        default : null
    },
    sex : {
        type : String,
        require : true
    },
    gohome : {
        type : Boolean,
        default : false
    },
    QR : {
        type : String
    },
    Faceimg : {
        type : String
    },
    created_at : {type : Date, index : {unique : false}, default : Date.now()},
    updated_at : {type : Date, index : {unique : false}, default : Date.now()}
})

fileSchema.static('addimg',function(QR, Faceimg, data){
    var addimg = new this({
        year : data.year,
        name : data.name,
        sex : data.sex,
        QR : QR,
        Faceimg : Faceimg
    })
    return addimg.save()
})

fileSchema.static('showimg',function(name){
    return this.find({name : name.name})
})

fileSchema.static('findlogin',function(data){
    return this.find({name : data.name, year : data.year})
})


var fileModel = mongoose.model('homlesspeople', fileSchema)
module.exports = fileModel