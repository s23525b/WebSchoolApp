var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const professorRouter = require('./routes/professorRoute');
const lectureRouter = require('./routes/lectureRoute');
const departmentRouter = require('./routes/departmentRoute');

const profApiRouter = require('./routes/api/ProfessorAPI');
const deptApiRouter = require('./routes/api/DepartmentAPI');
const lectApiRouter = require('./routes/api/LectureAPI');

const sequalizeInit = require('./config/sequelize/init');


var app = express();

sequalizeInit()
    .catch(err => {
        console.error(err);
    });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


app.set("view engine", "ejs");
app.use('/', indexRouter);
app.use('/professors', professorRouter);
app.use('/lectures', lectureRouter);
app.use('/departments', departmentRouter);

app.use('/api/professors', profApiRouter);
app.use('/api/departments', deptApiRouter);
app.use('/api/lectures', lectApiRouter);

app.use(express.static("public"));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
