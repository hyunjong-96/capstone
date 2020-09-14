var express = require('express');
var router = express.Router();
var spawn = require('child_process').spawn

/* GET home page. */
router.use(function timeLog(req, res, next) {//router레벨의 미들웨어라 접속만되도 돌아간다?
  console.log('Time:' + Date.now())
  next()
})

router.get('/', function (req, res) {
  var file = "voice-1585122503068.wav"
  var process = spawn('python', ["./spawntest.py", file])
  console.log('id : '+process.pid)
  process.stdout.on('data', function (data) {
    var data = JSON.parse(data)
    console.log('data : ' + data.object)
    console.log('sys : ' + data.argv)
  })
})



module.exports = router;
