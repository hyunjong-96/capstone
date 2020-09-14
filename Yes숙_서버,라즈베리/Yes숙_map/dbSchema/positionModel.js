var mongoose = require('mongoose')

var positionSchema = new mongoose.Schema({
    title: {type: String},
    latlng: [Number],
    ellipsis: {type: String},
    jibun: {type: String}
})

module.exports = mongoose.model('positions', positionSchema)