module.exports = function(app, constant) {
  app.use('/api/user', require('./user.api.routes'));

  app.use('/user', require('./user.routes'));

  app.use('/', require('./chat.routes'));

  var http = require('http').Server(app);
  var io = require('socket.io')(http);

  // TODO socket and api divide
  io.on('connection', function(socket){
    console.log(socket.id + ": login");
    socket.on('chat message', function(msg){
      //TODO store msg.
      console.log(socket.id, msg.user, msg.content);
      let text = "[" + msg.datetime + "] " + msg.user + " : " + msg.content;
      io.emit('chat message', text);
    });
  });

  http.listen(constant.PORT, function(){
    console.log('listening on *:' + constant.PORT);
  });

};
