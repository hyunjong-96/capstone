const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('../models/userModel')
//const Users = require('../models/uses')

module.exports = function () {
    passport.serializeUser(function (user, done) {
        console.log('serializeUser >> ' + user)
        done(null, user) //user는 deseriallzeUser의 첫번째 매개변수로 이동(미들웨어 이동)
    })                  //user를 클라이언트한테 쿠키로 보내기 설정
    //user객체를 전달받아 req.session.passport.user에 저장
    //로그인에 성공했을때 sessionStore에 저장
    passport.deserializeUser(function (user, done) {
        Users.findOne({name : user.name}, function (err, user) {
            console.log('deserializeUser >> ' + JSON.stringify(user))
            done(null, user)
        })
        //user는 req.user가 된다
    })                  //서버로 들어오는 요청마다 세션 정보(serializerUser에 저장된것)을 db의 데이터와 비교
                         //serializeUser를 통해 sessionStore에 저장을하고 어플리케이션에 사용할 데이터를 가져오는것
                          //reflash시 serializeUser를 호출해서 user를 호출하고 user를 받는다.
    passport.use(new LocalStrategy({
        usernameField: 'name',
        passwordField: 'year',
        session: true,
        passReqToCallback: false
    }, function (name, year, done) {
        console.log('LocalStrategy >>' + name, year)
        Users.findOne({ name: name }, function (findError, user) {
            console.log('user of DB>>' + user)
            if (findError) return done(findError)
            if (!user) return done(null, false, { message: '존재하지 않는 아이디' })//첫번쨰 인자: 서버에러를 넣는곳,두번쨰 인자 : 성공했을때 return값을 넣는곳, 세번째 인자 : 임의로 에러를 날때 
            return user.comparePassword(year, function (passError, isMatch) {
                if (passError) return done(null)
                if (isMatch) {
                    console.log('로그인성공')
                    return done(null, user)
                }
                return done(null, false, { message: '비밀번호가 틀렸습니다' })
            })
        })
    }))
}

