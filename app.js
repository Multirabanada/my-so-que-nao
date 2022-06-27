var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var UsuariosRouter = require('./routes/UsuariosRouter');
var AmigosRouter = require('./routes/AmigosRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/api/v1/usuarios', UsuariosRouter);
app.use('/api/v1/usuarios', AmigosRouter);

module.exports = app;