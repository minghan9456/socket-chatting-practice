const constant = require('./config/constant');

/*
const express = require('express');
const bodyParser = require('body-parser');

// other libs and middleware
const app = express();

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.use('/js', express.static(__dirname + '/public/js'));

// pass the instance of our app to the routes.
require('./routes/routes.js')(app);

app.listen(constant.PORT, function(){
  console.log('listening on *:' + constant.PORT);
});
*/

var express = require("express");
//var session = require('express-session');
const app = express();

app.use(express.json());

/*
var http = require('http').Server(app);
var io = require('socket.io')(http);
*/

app.use(express.static('public'));
app.use('/js', express.static(__dirname + '/public/js'));

require('./routes/routes.js')(app, constant);

/*
app.get('/', function(req, res){
    res.sendFile(__dirname + '/chat.html');
    });
*/

/*
io.on('connection', function(socket){
  console.log(socket.id);
  socket.on('chat message', function(msg){
    console.log(socket.id, msg.user, msg.content);
    io.emit('chat message', msg.content);
  });
});

http.listen(constant.PORT, function(){
  console.log('listening on *:' + constant.PORT);
});

/*
   app.get('/', function(req, res){
   res.sendFile(__dirname + '/test.html');
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
*/
