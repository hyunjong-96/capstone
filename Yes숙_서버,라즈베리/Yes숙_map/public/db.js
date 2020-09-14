var mongoose = require('mongoose')

module.exports = function () {
    var db = mongoose.connection
    db.on('error', function (err) {
        console.log('db errors : ', err)
    })
    db.once('open', function () {
        console.log('db connect success')
    })

    mongoose.connect('mongodb://localhost/mongodb_tutorial', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}