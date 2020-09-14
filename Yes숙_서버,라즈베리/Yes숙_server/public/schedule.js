const schedule = require('node-schedule')
var serviceAccount = require('./pushmessage-37f1f-firebase-adminsdk-h68yu-07e4aa106e.json')
var admin = require('firebase-admin')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})


module.exports = function (Data, time, max_function) {
    console.log('schedule test2')
    console.log('스케줄 time : ', time)
    console.log('선택 기능 : ', max_function)
    var D = ''
    var T = ''
    var M = ''
    if (max_function == '무료급식') {
        D = `${Data.name}님 밥`
        T = '밥먹을 시간'
        M = '왁자 어떄요'
    } else if (max_function == '상담시설') {
        D = `${Data.name}님 상담`,
            T = '상담시간',
            M = '왁자'
    } else if (max_function == '의료시설') {
        D = `${Data.name}님 병원`,
            T = '아픈데 없나',
            M = '왁자'
    } else if (max_function == '정책알림') {
        D = `${Data.name}님 정책`,
            T = '당신들을 위한 정책',
            M = '정책'
    } else if (max_function == '구인구직') {
        D = `${Data.name}님 일`,
            T = '머니플로우',
            M = '왁자'
    } else if (max_function == '보호시설') {
        D = `${Data.name}님 보호시설`,
            T = '따뜻한곳',
            M = '왁자'
    }

    let rule = new schedule.RecurrenceRule()
    rule.second = 30
    let job = schedule.scheduleJob(rule, function () {
        console.log('push message in time!!!!!')
        var fcm_target_token = Data.token
        var fcm_message = {
            data: {
                title: D,
                message: T,
                test: M
            },
            token: fcm_target_token
        }

        admin.messaging().send(fcm_message)
            .then(function (response) {
                console.log('보내기 성공 : ', response)
            })
            .catch(function (err) {
                console.log('보내기 실패 : ', err)
            })
    })
}