const {parentPort} = require('worker_threads')
const spawn = require('child_process').spawn

tomorrow()

function tomorrow(){
    var process = spawn('python',["./dl/tomorrow.py"])
    console.log('tomorrow.py process pid >> ',process.pid)
    process.stdout.on('data',function(data){
        var tomorrow_data=JSON.parse(data)
        if(tomorrow_data.am=='rain'){
            tomorrow_data.am='비'
        }
        else if(tomorrow_data.am=='clear'){
            tomorrow_data.am='맑음'
        }
        if(tomorrow_data.pm=='rain'){
            tomorrow_data.pm='비'
        }
        else if(tomorrow_data.pm=='clear'){
            tomorrow_data.pm='맑음'
        }
        console.log('tomorrow weather 결과 in tomorrowworker >> ',tomorrow_data)
        parentPort.postMessage(tomorrow_data)
    })
}