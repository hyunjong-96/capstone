const mongoose = require('mongoose')

const manageSchema = new mongoose.Schema({
    foodPlace : {
        type : String,
        required : true
    },
    managername : {
        type : String
    },
    pw : {
        type : String
    },
    created_at : {type : Date , index: { unique: false }, default : Date.now()},
    updated_at : {type : Date , index: { unique: false }, default : Date.now()},
})


manageSchema.static('signUp',function(data){
    var manager = new this({
        foodPlace : data.foodPlace,
        managername : data.managername,
        pw : data.pw
    })
    return manager.save()
})

manageSchema.static('findPlace',function(name){
    
    return this.find({managername : name})
})

var manageModel = mongoose.model('manageUser',manageSchema)
module.exports = manageModel