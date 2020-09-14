const admin = require('firebase-admin')
const schedule = require('node-schedule')
const { Worker, isMainThread } = require('worker_threads')
let myworker1, myworker2, myworker3, myworker4
let today = new Date()

module.exports = function () {
    var heat_result = ''
    var typhoon_result = ''
    var today_result = ''
    var tomorrow_result = ''
    if (isMainThread) {
        myworker1 = new Worker(__dirname + '/worker/heatworker.js')
        myworker2 = new Worker(__dirname + '/worker/typhoonworker.js')
        myworker3 = new Worker(__dirname + '/worker/todayworker.js')
        myworker4 = new Worker(__dirname + '/worker/tomorrowworker.js')
        let rule = new schedule.RecurrenceRule()
        //-----------------------------3일 뒤 폭염,한파 주의보 스케줄러---------------------------------------------------------------------
        myworker1.on('message', function (result) {
            heat_result = result
            console.log('weathermessage가 받은 heat.py 결과 >> ', result)
            console.log('!!!!!!!!!!!!!',heat_result.warning)
            if (heat_result.warning != 'nowarning') {
                console.log('warning >> ', heat_result.warning)
                console.log('--------------------------------------------heatwarning-------------------------------------------------')
                rule.second = 10
                var heatjob = schedule.scheduleJob(rule, function () {
                    const options = {
                        priority: 'high',
                        timeToLive: 60 * 60 * 2
                    }
                    var heat_message
                    if (heat_result.warning == 'heatwavewarning') {
                        heat_message = {
                            data: {
                                title: '3일 뒤 폭염주의보',
                                message: `3일 뒤 최고기온 ${heat_result.maxTemp}로 폭염주의보가 있을 예정입니다. 폭염에 대비하여 보호시설이나 그늘진곳으로 대피하십시오`,
                                test: ''
                            }
                        }
                    }
                    else if (heat_result.warning == 'heatwavewarningUp') {
                        heat_message = {
                            data: {
                                title: '3일 뒤 폭염경보',
                                message: `3일 뒤 최고기온 ${heat_result.maxTemp}로 폭염경보가 있을 예정입니다. 속히 폭염에 대비하여 보호시설이나 그늘진곳으로 최대한 빠르게 대피하십시오`,
                                test: ''
                            }
                        }
                    }
                    else if (heat_result.warning == 'coldwavewarning') {
                        heat_message = {
                            data: {
                                title: '3일 뒤 한파주의보',
                                message: `3일 뒤 최저기온 ${heat_result.maxTemp}로 한파 주의보가 있을 예정입니다. 속히 한파에 대비하여 보호시설로 대피하십시오`,
                                test: ''
                            }
                        }
                    }
                    else if (heat_result.warning == 'coldwavewarningUp') {
                        heat_message = {
                            data: {
                                title: '3일 뒤 한파경보',
                                message: `3일 뒤 최저기온 ${heat_result.maxTemp}로 한파 경보가 있을 예정입니다. 속히 한파에 대비하여 보호시설로 대피하십시오`,
                                test: ''
                            }
                        }
                    }
                    else {
                        heat_message = {
                            data: {
                                title: '3일 뒤 날씨는..',
                                message: `3일 뒤 날씨는 최저온도 ${heat_result.minTemp}, 최고온도 ${heat_result.maxTemp}로 좋은 날씨가 예상됩니다.`,
                                test: ''
                            }
                        }
                    }
                    admin.messaging().sendToTopic('warning', heat_message, options).then(function (response) {
                        console.log('Successfully sent heatwarning message: ', response)
                    })
                        .catch(function (errr) {
                            console.log('Error sending heatwarning message: ', error)
                        })
                })
            }
        })
        //---------------------------------------------------------------------------------------------------------------------------------------------
        //-----------------------------태풍 스케줄러-----------------------------------------------------------------------------------------------------
        myworker2.on('message', function (result) {
            typhoon_result = result
            console.log('weathermessage가 받은 typhoon.py 결과 >> ', result)

            if (typhoon_result.typhoon != 'notyphoon') {
                console.log('--------------------------------------------typhoon-------------------------------------------------')
                rule.second = 20
                var typhoonjob = schedule.scheduleJob(rule, function () {
                    const options = {
                        priority: 'high',
                        timeToLive: 60 * 60 * 2
                    }
                    var typhoon_message = {
                        data: {
                            title: '태풍이다',
                            message: typhoon_result.typhoon
                        }
                    }
                    admin.messaging().sendToTopic('typhoon', typhoon_message, options).then(function (response) {
                        console.log('Successfully sent typhoon message: ', response)
                    })
                        .catch(function (errr) {
                            console.log('Error sending typhoon message: ', error)
                        })
                })
            }
        })
        //--------------------------------------------------------------------------------------------------------------------------------
        //--------------------------------------------------오늘 날씨 스케줄러--------------------------------------------------------------------
        myworker3.on('message', function (result) {
            let year = today.getFullYear()
            let month = today.getMonth()
            let date = today.getDate()
            let day = today.getDay()
            var DAY = function(day){
                switch(day){
                    case 0 :
                        return '일요일'
                    case 1 :
                        return '월요일'
                    case 2 : 
                        return '화요일'
                    case 3 :
                        return '수요일'
                    case 4 :
                        return '목요일'
                    case 5 : 
                        return '금요일'
                    case 6 :
                        return '토요일'
                }
            }

            today_result = result
            console.log('weathermessasge가 받은 today.py 결과 >> ', today_result)

            //rule.hour = 6
            rule.second = 50
            var job = schedule.scheduleJob(rule, function () {
                const options = {
                    priority: 'high',
                    timeToLive: 60 * 60 * 2
                }
                var today_message
                if (today_result.status != 'error') {
                    console.log('--------------------------------------------todayweather-------------------------------------------------')
                    today_message = {
                        data: {
                            title: `[${year}년 ${month+1}월 ${date}일 ${DAY(day)}] 오늘의 날씨`,
                            message: `오늘의 날씨는 ${today_result.status} 예정이며 최고기온[${today_result.maxtemp}], 최저기온[${today_result.mintemp}]일 예정입니다. 오늘도 수고`
                        }
                    }
                }
                else {
                    today_message = {
                        data: {
                            title: `날씨 예보에 에러로 인해 잠시만 기다려주십시오`
                        }
                    }
                }   
                admin.messaging().sendToTopic('weather', today_message, options).then(function (response) {
                    console.log('Successfully sent today message: ', response)
                })
                    .catch(function (errr) {
                        console.log('Error sending today message: ', error)
                    })
            })
        })
        //-------------------------------------------------------------------------------------------------------------------------------------
        //-----------------------------------------------------------내일 날씨 스케줄러---------------------------------------------------------
        myworker4.on('message', function (result) {
            tomorrow_result = result
            console.log('weathermessasge가 받은 tomorrow.py 결과 >> ', tomorrow_result)
            //rule.hour = 21
            rule.second = 30
            console.log('--------------------------------------------tomorrowweather-------------------------------------------------')
            var job2 = schedule.scheduleJob(rule, function () {
                const options = {
                    priority: 'high',
                    timeToLive: 60 * 60 * 2
                }
                tomorrow_message = {
                    data: {
                        title: `내일 날씨`,
                        message: `오전 : ${tomorrow_result.am}, 오후 " ${tomorrow_result.pm} 이며 최저:${tomorrow_result.mintemp}, 최고:${tomorrow_result.maxtemp} 예상됩니다.`
                    }
                }

                admin.messaging().sendToTopic('weather', tomorrow_message, options).then(function (response) {
                    console.log('Successfully sent tomorrow message: ', response)
                })
                    .catch(function (error) {
                        console.log('error sending tomorrow message : ', error)
                    })
            })

        })
        //--------------------------------------------------------------------------------------------------------------------------
    }
}