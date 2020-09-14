var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var session = require('express-session')
var passport = require('passport')
var mongostore = require('connect-mongo')(session)
var passportConfig = require('./public/passport')
var serveStatic = require('serve-static')

var db = mongoose.connection;
db.on('error',console.error)
db.once('open',function(){
  console.log("----몽고디비 연결----")
})

mongoose.connect('mongodb://localhost:27017/shopping',{
  useNewUrlParser : true,
  useUnifiedTopology : true,
  useCreateIndex : true
})


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/upload');
var signupRouter = require('./routes/homeless/signup');
var filedownloadRouter = require('./routes/filedownload');
var homelessRouter = require('./routes/homeless/freefood')
var loginRouter = require('./routes/homeless/login')
var managerRouter = require('./routes/manager/manager')
var gohomeRouter = require('./routes/homeless/gohome')
var scanRouter = require('./routes/homeless/scan')
var foodimgRouter = require('./routes/foodimg')
var test= require('./routes/test');
const wheathermessage = require('./public/wheathermessage')

var app = express();

app.io = require('socket.io')()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public','foodimg')));
app.use(express.static(path.join(__dirname, 'face')));
app.use(express.static(path.join(__dirname, 'voice')));
app.use(serveStatic(path.join(__dirname,'QR_img')))
app.use(session({
  secret : 'secretkey',
  resave : false, //session데이터가 바뀌기전까지 저장소에 저장하지않는다
  saveUninitialized : true, //세션이 필요하기전까지 세션을 구동시키지않는다.
  store : new mongostore({mongooseConnection : mongoose.connection}),
  cookie : {
    maxAge : 60*60*1000, //만료시간 1분
  }
}))
app.use(passport.initialize()) //passport구동
app.use(passport.session()) //로그인을 지속시켜주기 위한 session을 사용.(session연결)
passportConfig() //seralizer와 deserialzer사용
wheathermessage()

app.use('/face',express.static(__dirname+'/face'))
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/upload',uploadRouter);
app.use('/signup',signupRouter);
app.use('/filedownload',filedownloadRouter);
app.use('/freefood',homelessRouter);
app.use('/login',loginRouter);
app.use('/manager',managerRouter)
app.use('/gohome',gohomeRouter)
app.use('/scan',scanRouter)
app.use('/foodimg',foodimgRouter)
app.use('/test',test)

//app.use('/logintest',test)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.io.on('connection',function(socekt){
  console.log('socketio user connected..')
  socekt.emit('pushNotification', {success:true, msg:'hello'})

  socekt.on('disconnect',function(){
    console.log('user discpnnected')
  })
})

module.exports = app;
