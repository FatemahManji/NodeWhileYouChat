
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
io.on('connection', function(socket){

  console.log('A User Connected');

  // Handle Message Event
  socket.on('message', function(text){
    io.emit('update', text);
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




var nick;
//var socket = socketio.connect('localhost', { port: 3636 });
var rl = readline.createInterface(process.stdin, process.stdout);


// Set the username
rl.question("Please enter a nickname: ", function(name) {
    nick = name;
    var msg = nick + " has joined the chat";
    socket.emit('send', { type: 'notice', message: msg });
    rl.prompt(true);
});

function console_out(msg) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log(msg);
    rl.prompt(true);
}


