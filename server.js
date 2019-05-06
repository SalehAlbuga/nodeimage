var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var debug = require('debug')('blanktest:server');
var http = require('http');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // res.status(200).send("Return every single thing")
  next()
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

app.get('/', (req, res) => {
    res.send('Hello fragile world v2! \n APP_SERVICE: ' + process.env.MY_ENV_VAR + ' \n IMAGE: ' + process.env.IMAGE_VAR);
});

app.get('/api/verify', (req, res) => {
    res.send('Token received: '  + req.query['token'])
});

var server = http.createServer(app);

server.listen(8000, (err) => {
    console.log("express is listening!" );
});