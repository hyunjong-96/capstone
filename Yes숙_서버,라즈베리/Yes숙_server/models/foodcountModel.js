const mongoose = require('mongoose')
var moment = require('moment')
const Schema = mongoose.Schema

require('moment-timezone')
moment.tz.setDefault("Asia/Seoul")
var data_now=moment().format('YYY-MM-DD HH:mm:ss')

var foodcountSchema = new Schema({
    name : {
        type: String,
        index: 'hashed',
        require : true
    },
    foodCount : {
        type : Number
    },
    updated_at : {
        type : Date,
        default : data_now
    }
})

foodcountSchema.static('foodCount',function(data){
    return this.find({name : data.name })
})

foodcountSchema.static('countUpdate',function(data, count){
    return this.updateOne({name : data[0].name}, {$set :{foodCount : count,updated_at:Date.now()}})
})

foodcountSchema.static('insertFood',function(name, count){
    return this.updateOne({name : name}, {$set :{foodCount : count}}, {$set :{updated_at : Date.now()}})
})

var foodCountModel = mongoose.model('foodcount',foodcountSchema )
module.exports = foodCountModel