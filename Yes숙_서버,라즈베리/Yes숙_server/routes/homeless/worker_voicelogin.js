const {Worker, workerData, parentPort} = require('worker_threads')
const spawn = require('child_process').spawn
console.log('workerData : '+workerData)
voicecompare(workerData)

function voicecompare(voice){
    console.log('its workerthread of voiclogin !!!!!!!!!!!!!!!!!!!')
    var process = spawn('python', ["./TestSample1.py", voice])
    process.stdout.on('data',function(data){
        console.log('This voicecompare_process is pid : '+process.pid)
        var data = JSON.parse(data)
        console.log('find user voice_file : ' + data.object)
        parentPort.postMessage(data)
    })
}