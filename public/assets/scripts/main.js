
// Wait for DOM to Load
jQuery(function($) {

    $( "#theFieldID" ).focus();

    // Create New Socket Connection using Socket.io
    var socket = io();

    // Send A Message To The Server
    $('a').on('click', function(){
      var text = $('input.textMessage').val();
      socket.emit('message', text);
    });

    // Recieve Update Event From The Server
    socket.on('update', function(data){
      //create div with avatar icon
      var avatar = $('<div>');
      avatar.css('background-image', 'url(./assets/images/' + data.avatar + '.png)');
      avatar.css('width', '50px');
      avatar.css('height', '50px');
      avatar.css('display', 'inline-block');
      
      console.log(avatar);

      $('.messages').append(avatar).append(data.message).append('<br>');
    });

    $('button.setName').on('click', function(){
      var name = $('input.userNameImput').val();

      var avatar = $('input[name=face]:checked').val();

      console.log(avatar);
      var data = {
        name: name,
        avatar: avatar
      };

      socket.emit('identify', data);
    });

    // Press enter to send message
    $('input.textMessage').keypress(function (e) {
      var key = e.which;

      if (key == 13) {// code for enter key
        var entermsg = $('input.textMessage').val();
        socket.emit('message', entermsg);
      }
    });
});
