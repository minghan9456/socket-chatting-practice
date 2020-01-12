var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser());
app.use(session({ secret: '25hrjkdsanfukhfjdksa' }));
app.use(express.json());

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));

require('./routes/base.js')(app);
