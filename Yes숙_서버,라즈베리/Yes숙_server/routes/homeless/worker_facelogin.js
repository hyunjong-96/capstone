const {Worker,workerData,parentPort} = require('worker_threads')
const spawn = require('child_process').spawn

facecompare(workerData)

function facecompare(face){
    console.log('workertrhead >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.')
    var process = spawn('python', ["./facecompare.py", face])
    process.stdout.on('data', function (data) {
        console.log('This facecompare_process is pid : '+process.pid)
        var data = JSON.parse(data)
        console.log('find user face_file : ' + data.object)
        var results = data.object
        parentPort.postMessage(results)
    })
}