const functionModel = require('../models/function')
const scheduling = require('./schedule')


module.exports = function (data) {
    console.log('횟수 찾기 함수에 들어온 data >> ',data)
    functionModel.max_cnt_function(data)
    .then(function (result) {
      var max_cnt_function = 0
      var max_function = ''
      console.log('max_cnt_function result >> ',result)
      for (i = 0; i < result[0].function.length; i++) {
        if (max_cnt_function < result[0].function[i].cnt_function) {
          max_cnt_function = result[0].function[i].cnt_function
          max_function = result[0].function[i].name_function
        }
      }
      console.log('user name >>> ', data.name)
      console.log('result >>>', result[0])
      console.log('max_cnt_function >>>>', max_cnt_function)
      console.log('max_function >>>>', max_function)
      functionModel.aggregate([
        { $unwind: '$function' },
        { $match: { 'token': data.token, 'function.name_function': max_function } },
        { $project: { max_time: { $arrayElemAt: ['$function.time.hour', { $indexOfArray: ['$function.time.cnt_time', { $max: '$function.time.cnt_time' }] }] } } }
      ])
        .then(function (result) {
          time = result[0].max_time
          console.log('많이 사용한 시간',time)
          scheduling(data, time,max_function)
        })
        .catch(function (err) {
            return err
        })
    })
    .catch(function (err) {
      return err
    })
}