const mongoose = require('mongoose')
const Schema = mongoose.Schema

var pushMessageSchema = new Schema({
    name :{
        type : String,
        require : true
    },
    token:{
        type:String,
        default : ''
    },
    topic:{
        type:String,
        default : ''
    },
    first:{
        type:Boolean,
        default : true
    }
})

pushMessageSchema.static('createPush',function(data){
    var push = new this({
        name : data.name,
        token : data.token,
        topic : data.topic
    })
    return push.save()
})

module.exports = mongoose.model('pushmessages',pushMessageSchema)