const mongoose = require('mongoose')
var moment = require('moment')
require('moment-timezone')
moment.tz.setDefault("Asia/Seoul")
var HOUR = moment().format('HH')
var date = Number(HOUR)

var functionSchema = new mongoose.Schema({
    name: String,
    token: {
        type: String,
        default: ''
    },
    function: [{
        name_function: {
            type: String,
            trim: true
        },
        cnt_function: Number,
        time: [{
            hour: Number,
            cnt_time: Number
        }]
    }]
})

const H = [
    { hour: 0, cnt_time: 0 }, { hour: 1, cnt_time: 0 }, { hour: 2, cnt_time: 0 }, { hour: 3, cnt_time: 0 }, { hour: 4, cnt_time: 0 }, { hour: 5, cnt_time: 0 }, { hour: 6, cnt_time: 0 }, { hour: 7, cnt_time: 0 }, { hour: 8, cnt_time: 0 }, { hour: 9, cnt_time: 0 }, { hour: 10, cnt_time: 0 }, { hour: 11, cnt_time: 0 }, { hour: 12, cnt_time: 0 }, { hour: 13, cnt_time: 0 }, { hour: 14, cnt_time: 0 }, { hour: 15, cnt_time: 0 }, { hour: 16, cnt_time: 0 }, { hour: 17, cnt_time: 0 }, { hour: 18, cnt_time: 0 }, { hour: 19, cnt_time: 0 }, { hour: 20, cnt_time: 0 }, { hour: 21, cnt_time: 0 }, { hour: 22, cnt_time: 0 }, { hour: 23, cnt_time: 0 }
]

functionSchema.static('creatfunctiontime', function (data) {
    var createFun = new this({
        name: data.name,
        token: data.token,
        function: [
            {
                name_function: '무료급식',
                cnt_function: 0,
                time: H
            },
            {
                name_function: '상담시설',
                cnt_function: 0,
                time: H
            },
            {
                name_function: '의료시설',
                cnt_function: 0,
                time: H
            },
            {
                name_function: '정책알림',
                cnt_function: 0,
                time: H
            },
            {
                name_function: '구인구직',
                cnt_function: 0,
                time: H
            },
            {
                name_function: '보호시설',
                cnt_function: 0,
                time: H
            }
        ]
    })
    return createFun.save()
})

functionSchema.static('functioncount', function (data) {
    console.log('???',date)
    console.log('사용한 기능 : ',data.function)
    switch (data.function) {
        case '무료급식':
            switch (date) {
                case 0:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.0.cnt_time': 1 } })
                case 1:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.1.cnt_time': 1 } })
                case 2:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.2.cnt_time': 1 } })
                case 3:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.3.cnt_time': 1 } })
                case 4:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.4.cnt_time': 1 } })
                case 5:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.5.cnt_time': 1 } })
                case 6:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.6.cnt_time': 1 } })
                case 7:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.7.cnt_time': 1 } })
                case 8:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.8.cnt_time': 1 } })
                case 9:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.9.cnt_time': 1 } })
                case 10:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.10.cnt_time': 1 } })
                case 11:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.11.cnt_time': 1 } })
                case 12:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.12.cnt_time': 1 } })
                case 13:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.13.cnt_time': 1 } })
                case 14:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.14.cnt_time': 1 } })
                case 15:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.15.cnt_time': 1 } })
                case 16:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.16.cnt_time': 1 } })
                case 17:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.17.cnt_time': 1 } })
                case 18:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.18.cnt_time': 1 } })
                case 19:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.19.cnt_time': 1 } })
                case 20:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.20.cnt_time': 1 } })
                case 21:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.21.cnt_time': 1 } })
                case 22:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.22.cnt_time': 1 } })
                case 23:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.0.cnt_function': 1, 'function.0.time.23.cnt_time': 1 } })
                    break
            }
        case '상담시설':
            switch (date) {
                case 0:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.0.cnt_time': 1 } })
                case 1:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.1.cnt_time': 1 } })
                case 2:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.2.cnt_time': 1 } })
                case 3:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.3.cnt_time': 1 } })
                case 4:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.4.cnt_time': 1 } })
                case 5:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.5.cnt_time': 1 } })
                case 6:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.6.cnt_time': 1 } })
                case 7:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.7.cnt_time': 1 } })
                case 8:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.8.cnt_time': 1 } })
                case 9:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.9.cnt_time': 1 } })
                case 10:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.10.cnt_time': 1 } })
                case 11:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.11.cnt_time': 1 } })
                case 12:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.12.cnt_time': 1 } })
                case 13:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.13.cnt_time': 1 } })
                case 14:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.14.cnt_time': 1 } })
                case 15:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.15.cnt_time': 1 } })
                case 16:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.16.cnt_time': 1 } })
                case 17:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.17.cnt_time': 1 } })
                case 18:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.18.cnt_time': 1 } })
                case 19:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.19.cnt_time': 1 } })
                case 20:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.20.cnt_time': 1 } })
                case 21:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.21.cnt_time': 1 } })
                case 22:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.22.cnt_time': 1 } })
                case 23:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.1.cnt_function': 1, 'function.1.time.23.cnt_time': 1 } })
            }
            break

        case '의료시설':
            switch (date) {
                case 0:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.0.cnt_time': 1 } })
                case 1:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.1.cnt_time': 1 } })
                case 2:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.2.cnt_time': 1 } })
                case 3:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.3.cnt_time': 1 } })
                case 4:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.4.cnt_time': 1 } })
                case 5:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.5.cnt_time': 1 } })
                case 6:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.6.cnt_time': 1 } })
                case 7:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.7.cnt_time': 1 } })
                case 8:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.8.cnt_time': 1 } })
                case 9:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.9.cnt_time': 1 } })
                case 10:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.10.cnt_time': 1 } })
                case 11:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.11.cnt_time': 1 } })
                case 12:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.12.cnt_time': 1 } })
                case 13:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.13.cnt_time': 1 } })
                case 14:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.14.cnt_time': 1 } })
                case 15:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.15.cnt_time': 1 } })
                case 16:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.16.cnt_time': 1 } })
                case 17:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.17.cnt_time': 1 } })
                case 18:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.18.cnt_time': 1 } })
                case 19:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.19.cnt_time': 1 } })
                case 20:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.20.cnt_time': 1 } })
                case 21:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.21.cnt_time': 1 } })
                case 22:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.22.cnt_time': 1 } })
                case 23:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.2.cnt_function': 1, 'function.2.time.23.cnt_time': 1 } })
            }
            break

        case '정책알림':
            switch (date) {
                case 0:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.0.cnt_time': 1 } })
                case 1:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.1.cnt_time': 1 } })
                case 2:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.2.cnt_time': 1 } })
                case 3:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.3.cnt_time': 1 } })
                case 4:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.4.cnt_time': 1 } })
                case 5:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.5.cnt_time': 1 } })
                case 6:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.6.cnt_time': 1 } })
                case 7:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.7.cnt_time': 1 } })
                case 8:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.8.cnt_time': 1 } })
                case 9:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.9.cnt_time': 1 } })
                case 10:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.10.cnt_time': 1 } })
                case 11:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.11.cnt_time': 1 } })
                case 12:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.12.cnt_time': 1 } })
                case 13:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.13.cnt_time': 1 } })
                case 14:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.14.cnt_time': 1 } })
                case 15:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.15.cnt_time': 1 } })
                case 16:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.16.cnt_time': 1 } })
                case 17:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.17.cnt_time': 1 } })
                case 18:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.18.cnt_time': 1 } })
                case 19:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.19.cnt_time': 1 } })
                case 20:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.20.cnt_time': 1 } })
                case 21:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.21.cnt_time': 1 } })
                case 22:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.22.cnt_time': 1 } })
                case 23:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.3.cnt_function': 1, 'function.3.time.23.cnt_time': 1 } })
            }
            break

        case '구인구직':
            switch (date) {
                case 0:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.0.cnt_time': 1 } })
                case 1:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.1.cnt_time': 1 } })
                case 2:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.2.cnt_time': 1 } })
                case 3:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.3.cnt_time': 1 } })
                case 4:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.4.cnt_time': 1 } })
                case 5:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.5.cnt_time': 1 } })
                case 6:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.6.cnt_time': 1 } })
                case 7:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.7.cnt_time': 1 } })
                case 8:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.8.cnt_time': 1 } })
                case 9:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.9.cnt_time': 1 } })
                case 10:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.10.cnt_time': 1 } })
                case 11:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.11.cnt_time': 1 } })
                case 12:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.12.cnt_time': 1 } })
                case 13:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.13.cnt_time': 1 } })
                case 14:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.14.cnt_time': 1 } })
                case 15:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.15.cnt_time': 1 } })
                case 16:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.16.cnt_time': 1 } })
                case 17:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.17.cnt_time': 1 } })
                case 18:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.18.cnt_time': 1 } })
                case 19:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.19.cnt_time': 1 } })
                case 20:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.20.cnt_time': 1 } })
                case 21:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.21.cnt_time': 1 } })
                case 22:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.22.cnt_time': 1 } })
                case 23:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.4.cnt_function': 1, 'function.4.time.23.cnt_time': 1 } })
            }
            break

        case '보호시설':
            switch (date) {
                case 0:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.0.cnt_time': 1 } })
                case 1:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.1.cnt_time': 1 } })
                case 2:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.2.cnt_time': 1 } })
                case 3:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.3.cnt_time': 1 } })
                case 4:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.4.cnt_time': 1 } })
                case 5:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.5.cnt_time': 1 } })
                case 6:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.6.cnt_time': 1 } })
                case 7:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.7.cnt_time': 1 } })
                case 8:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.8.cnt_time': 1 } })
                case 9:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.9.cnt_time': 1 } })
                case 10:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.10.cnt_time': 1 } })
                case 11:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.11.cnt_time': 1 } })
                case 12:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.12.cnt_time': 1 } })
                case 13:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.13.cnt_time': 1 } })
                case 14:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.14.cnt_time': 1 } })
                case 15:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.15.cnt_time': 1 } })
                case 16:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.16.cnt_time': 1 } })
                case 17:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.17.cnt_time': 1 } })
                case 18:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.18.cnt_time': 1 } })
                case 19:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.19.cnt_time': 1 } })
                case 20:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.20.cnt_time': 1 } })
                case 21:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.21.cnt_time': 1 } })
                case 22:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.22.cnt_time': 1 } })
                case 23:
                    return this.updateOne({ name: data.name, token: data.token }, { $inc: { 'function.5.cnt_function': 1, 'function.5.time.23.cnt_time': 1 } })
            }
            break
    }
})

functionSchema.static('max_cnt_function', function (data) {
    return this.find({name:data.name, token: data.token}, { 'function.name_function': true, 'function.cnt_function': true })
})


/*embedded document find
functionModel.find({'function':{$elemMatch:{'name_function':req.body.function}}},{'function.name_function':true,'function':{$elemMatch:{name_function:req.body.function}}})
  .then(function(result){
    res.send(result)
  })
*/

module.exports = mongoose.model('countfunction', functionSchema)