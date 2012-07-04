var express = require('express'),
    socket = require('socket.io'),
    app = express.createServer(),
    io = socket.listen(app);

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
}).listen(2000);

function sendConnectedCount(){
  io.sockets.emit('clients:connected', { count: io.sockets.clients().length });
};

io.sockets.on('connection', function(socket){
  sendConnectedCount();

  socket.on('room:message', function(data){
    io.sockets.emit('room:message', data);
  });

  socket.on('disconnect', sendConnectedCount);
});
