
// Require Native Node.js Libraries
var express = require('express');
var app = express();
var http = require('http');
http = http.Server(app);
var io = require('socket.io');
io = io(http);

// Route our Assets
app.use('/assets/', express.static(__dirname + '/public/assets/'));

// Route our Home Page
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

// Handle Socket Connection
//io.on('connection', function(socket){

  //console.log('A User Connected');

  // Handle Message Event
  //socket.on('message', function(text){
    //io.emit('update', text);
  //});

//});

    // socket.io listen for messages
    io.on('connection', function(socket) {  
    	console.log('A User Connected');
      socket.broadcast.emit('update', 'a new user has joined');

      socket.nickname = 'noName';
      // When a message is received, broadcast it
      // to all users except the originating client
      socket.on('message', function(data) { 
        var message = socket.nickname + ': ' + data;  
        io.emit('update', message);        
      });

      // When a user joins the chat, send a notice
      // to all users except the originating client
      // socket.on('join', function(nickname) {
      // 	console.log('A User nickname');
      //   // Attach the user's nickname to the socket
      //   // io.nickname = nickname;

      //   // socket.broadcast.emit('notice', nickname + ' has joined the chat.');
      // });

      socket.on('identify', function(name){
        socket.nickname = name;
      })

      // When a user disconnects, send a notice
      // to all users except the originating client
      socket.on('disconnect', function() {
      	console.log('A User disonnected');
        socket.broadcast.emit('notice', socket.nickname + ' has left the chat.');
      });
    });


// Start Server
http.listen(process.env.PORT || 3000, process.env.IP || "127.0.0.1", function(){
  var addr = http.address();
  console.log("Server started at", addr.address + ":" + addr.port);
});

var readline = require('readline'),
socketio = require('socket.io-client'),
util = require('util');
color = require("ansi-color").set;


 // Configure Jade template engine
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));


// var nick;
// var socket = socketio.connect('localhost', { port: 3000 });
// var rl = readline.createInterface(process.stdin, process.stdout);


// // Set the username
// rl.question("Please enter a nickname: ", function(name) {
//     nick = name;
//     var msg = nick + " has joined the chat";
//     socket.emit('send', { type: 'notice', message: msg });
//     function console_out(msg) {
//     	process.stdout.clearLine();
//     	process.stdout.cursorTo(0);
//     	console.log(msg);
//     	rl.prompt(true);
//     }
// });





