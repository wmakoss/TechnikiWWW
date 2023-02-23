var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var sqlite3 = require('sqlite3');
// var md5 = require('md5');
var uuid = require('uuid');

var indexRouter = require('./routes/index');
var registrationRouter = require('./routes/registration');
var loginRouter = require('./routes/login');
var gameRouter = require('./routes/game');
var logoutRouter = require('./routes/logout');
var mygamesRouter = require('./routes/mygames');
var buygameRouter = require('./routes/buygame');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', function(req, res, next)
{
    var db = new sqlite3.Database('database.db');
    var usercookie;
    if(req.cookies["session"] == undefined)
    {
        usercookie = uuid.v4(); // new session cookie

        db.run("insert into sessions (cookie, userid) values ('" + usercookie + "', 0);");
        
        //add cookie
        res.cookie("session", usercookie, {secure: false, httpOnly: false, sameSite: false, path: '/'});
        req.cookies["session"] = usercookie;
    }
    else
    {
        usercookie = req.cookies["session"];
        
    }

    db.all("select userid, login from sessions inner join users on users.id = sessions.userid where cookie = '" + usercookie + "';", function(err, row)
    {
        req.userid = row[0].userid;
        req.userlogin = row[0].login;

        db.close();
        next();
    });

})

app.use('/', indexRouter);
app.use('/registration', registrationRouter);
app.use('/login', loginRouter);
app.use('/game', gameRouter);
app.use('/logout', logoutRouter);
app.use('/mygames', mygamesRouter);
app.use('/buygame', buygameRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next)
{
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next)
{
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
