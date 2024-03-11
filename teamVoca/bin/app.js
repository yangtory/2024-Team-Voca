/**
 * express generator ES6+ Template
 * @author : callor@callor.com
 * @since : 2020-12-10
 * @update : 2024-01-19
 * @see : nodejs + express 프로젝트에서 ES6+ 문법을 사용하기 위한 template
 */

// essential modules
import express from 'express';
import createError from 'http-errors';
import path from 'path';
import helmet from 'helmet';
import session from 'express-session';

// 3rd party lib modules
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// MySQL Sequelize
import DB from '../models/index.js';

// import router modules
import indexRouter from '../routes/index.js';
import usersRouter from '../routes/users.js';
import vocaRouter from '../routes/voca.js';
import quizRouter from '../routes/quiz.js';
import commuRouter from '../routes/commu.js';
import settingRouter from '../routes/setting.js';
import tutoRouter from '../routes/tuto.js';

// create express framework
const app = express();

// helmet security module
app.use(helmet());

// MySQL DB 연결
// 주의!!! force 를 true 로 하면 기존의 Table 을 모두 DROP 한 후 재생성 한다
DB.sequelize.sync({ force: false }).then((dbConn) => {
    console.log(dbConn.options.host, dbConn.config.database, 'DB Connection OK');
});

// Disable the fingerprinting of this web technology.
app.disable('x-powered-by');

// view engine setup
app.set('views', path.join('views'));
app.set('view engine', 'pug');

// middleWare enable
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join('public')));

app.use(
    session({
        key: 'callor',
        secret: 'callor@callor.com',
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        },
    })
);

app.use((req, res, next) => {
    res.locals = req.session;
    next();
});

// router link enable, link connection
app.use('/', indexRouter);
app.use((req, res, next) => {
    res.locals = req.session;
    next();
});

// router link enable, link connection
app.use('/users', usersRouter);
app.use('/voca', vocaRouter);
app.use('/quiz', quizRouter);
app.use('/commu', commuRouter);
app.use('/setting', settingRouter);
app.use('/tuto', tutoRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;
