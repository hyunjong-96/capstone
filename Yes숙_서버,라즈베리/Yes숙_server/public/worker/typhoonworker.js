const {parentPort}= require('worker_threads')
const spawn = require('child_process').spawn

typhoon()

function typhoon(){
    console.log('----search the typhoon... wating second...')
    var process = spawn('python',["./dl/typhoon.py"])
    console.log('typhoon process pid >> ',process.pid)
    process.stdout.on('data',function(data){
        typhoon_warning = JSON.parse(data)
        console.log('result typhoon >> ',typhoon_warning)
        console.log('태풍 결과 : ',typhoon_warning.typhoon)
        parentPort.postMessage(typhoon_warning)
    })
}