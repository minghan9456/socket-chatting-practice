module.exports = function(app, constant) {
  app.use('/api/user', require('./user'));

  var http = require('http').Server(app);
  var io = require('socket.io')(http);

  app.use('/', require('./chat'));
  // TODO socket and api divide
  io.on('connection', function(socket){
    console.log(socket.id + ": login");
    socket.on('chat message', function(msg){
      //TODO store msg.
      console.log(socket.id, msg.user, msg.content);
      io.emit('chat message', msg.content);
    });
  });

  http.listen(constant.PORT, function(){
    console.log('listening on *:' + constant.PORT);
  });

};
