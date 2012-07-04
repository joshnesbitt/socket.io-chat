var App = function(){
  this.socket = io.connect('http://10.10.1.176:2000');
  this.$clientsInfo = $('#clients-info strong');
  this.$userInfo = $('#user-info strong');
  this.$messages = $('#messages');
  this.$input = $('#input');

  this.sendMessage = function(message){
    this.socket.emit('room:message', {
      username : this.username,
      message  : message
    });
  };

  this.collectUsername = function(){
    this.username = prompt("What's your name?");
    this.$userInfo.html(this.username);
  };

  this.updateClientInfo = function(data){
    this.$clientsInfo.html(data.count);
  };
};

window.onload = function(){

  var app = new App;

  app.socket.on('clients:connected', function (data){
    app.collectUsername();
    app.updateClientInfo(data);
  });

  app.socket.on('room:message', function (data){
    app.$messages.append("<li><span>" + data.username + ":</span> " + data.message + "</li>");
  });

  app.$input.on('keyup', function(e){
    if(e.which === 13){
      app.sendMessage(app.$input.val());
      app.$input.val('');
    }
  });

};
