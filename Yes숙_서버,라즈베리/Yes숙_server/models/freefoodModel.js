const mongoose = require('mongoose')
const Schema = mongoose.Schema

var freefoodSchema = new Schema({
    name: {
        type: String,
        index: 'hashed',
        require : true
    },
    address: {
        type: String,
        default: '-'
    },
    time : {
        type : String,
        default : '-'
    },
    place : {
        type : String,
        default : '-'
    },
    freefoodDay : {
        type : String,
        default : '-'
    },
    tel: {
        type: String,
        default: '-',
    },
    geometry: {    //경위도 좌표 저장 //경위도를 찾을때 db에서 칼럼을 찾아오면 results[0]._doc
        type: {    //위치 정보의 유형을 구별하는 것
            type: String,
            default: "Point"
        },
        coordinates: [{ type: Number }]   //위치자표를 넣을 수 있는 배열로 정의로 number타입의 좌표를 사용
        //커피숍 위치를 표시하기위해 경도좌표 coordinates[0], 위도좌표 coordiantes[1]
    },
    created_at: { type: Date, index: { unique: false }, default: Date.now() },
    updated_at: { type: Date, index: { unique: false }, default: Date.now() }
})

freefoodSchema.index({ geometry: '2dsphere' }) //geometry속성에 인덱스를 만들어 조회 속도를 빠르게하기위해
//스키마 객체의 index()메소드를 사용해서 2dsphere타입으로 지

freefoodSchema.static('FF_add', function (data) {
    var freefood = new this({
        name: data.name, address: data.address, tel: data.tel, time: data.time, place : data.place, freefoodDay : data.freefoodDay, 
        geometry: {
            type: 'Point',
            coordinates: [data.longitude, data.latitude]
        }
    })
    return freefood.save();
})

freefoodSchema.static('FF_show',function(data, radius){
    return this.find().where('geometry').within(
        //속성geometry에서 near()에 내 위치 center속성에서 거리 maxDistance를 설정해주고
        {
            center: [parseFloat(data.longitude), parseFloat(data.latitude)],
            radius: parseFloat(radius / 6371000),
            unique: true, spherical: true
        },
    ).limit(5)
})

var freefoodModel = mongoose.model('freefood',freefoodSchema )
module.exports = freefoodModel