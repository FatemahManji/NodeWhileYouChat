
// Wait for DOM to Load
jQuery(function($) {

    // Create New Socket Connection using Socket.io
    var socket = io();

    // Send A Message To The Server
    $('a').on('click', function(){
      var text = $('input.textMessage').val();
      socket.emit('message', text);
    });

    // Recieve Update Event From The Server
    socket.on('update', function(msg){
      $('.messages').append(msg).append('<br>');
    });

    $('button.setName').on('click', function(){
      var name = $('input.userNameImput').val();
      socket.emit('identify', name);
    });

});