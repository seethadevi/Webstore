var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet')
var indexRouter = require('./routes/index');
var cart= require('./routes/cart');
var listofproducts= require('./routes/listofproducts');
var msg= require('./routes/msg');
var product= require('./routes/product');
var qrpage= require('./routes/qrpage');
var orders= require('./routes/orders');
var forgotpwd= require('./routes/forgotpwd');

var gift= require('./routes/gift');

var browseproducts= require('./routes/browseproducts');

var singleprod= require('./routes/singleprod');
var webmail= require('./routes/webmail');
var error= require('./routes/error');

var userprofile= require('./routes/userprofile');

var app = express();
app.use(helmet());
app.disable('x-powered-by');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', {layout: false,cache : false});
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use('/', indexRouter);
app.use('/cart', cart);
app.use('/listofproducts', listofproducts);
app.use('/msg', msg);
app.use('/product', product);
app.use('/qrpage', qrpage);
app.use('/browseproducts', browseproducts);
app.use('/singleprod', singleprod);
app.use('/webmail', webmail);
app.use('/error', error);
app.use('/userprofile', userprofile);
app.use('/gift', gift);
app.use('/orders', orders);
app.use('/forgotpwd', forgotpwd);

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

module.exports = app;
