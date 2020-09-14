const {parentPort} = require('worker_threads')
const spawn = require('child_process').spawn

heatwarning()

function heatwarning(){
    console.log('----search the heatwarning... wating second...')
    var process = spawn('python',['./dl/heat.py'])
    console.log('heat process pid >> ',process.pid)
    process.stdout.on('data',function(data){
        heat_warning = JSON.parse(data)
        console.log('3일 뒤의 날씨 >>',heat_warning.warning,'최대 : ',heat_warning.maxTemp,'최소 온도 : ',heat_warning.minTemp)
        parentPort.postMessage(heat_warning)
    })
}