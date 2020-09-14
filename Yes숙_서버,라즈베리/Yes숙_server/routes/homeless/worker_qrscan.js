const {Worker, workerData, parentPort} = require('worker_threads')
const spawn = require('child_process').spawn
qrscan(workerData)

function qrscan(QR){
    console.log('QRscan_workerThread !!!!!!!!!!')
    var process = spawn('python', ["./featurematching.py", QR])
    process.stdout.on('data', function (data){
        var data = JSON.parse(data)
        console.log('data.object : ',data.object[0])
        console.log('worker_type : '+typeof(data.object[0]))
        parentPort.postMessage(data.object[0])
    })
}