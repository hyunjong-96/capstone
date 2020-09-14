const {parentPort} = require('worker_threads')
const spawn = require('child_process').spawn

todayweather()

function todayweather(){
    console.log('-------search the todayweather... waiting second.......')
    var process = spawn('python',["./dl/today.py"])
    console.log('today.py process pid >> ',process.pid)
    process.stdout.on('data',function(data){
        var today_data = JSON.parse(data)
        if(today_data.status == 'cloud'){
            today_data.status = '구름조금'
        }
        else if(today_data.status == 'haze'){
            today_data.status = '안개'
        }
        else if(today_data.status == 'clear'){
            today_data.status = '맑음'
        }
        else if(today_data.status == 'rain'){
            today_data.status ='비'
        }
        console.log('today weather 결과 in todayworker >> ',today_data)
        parentPort.postMessage(today_data)
    })
}