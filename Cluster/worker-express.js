var express = require('express'),
	http = require('http');

var app = express();
app.get('/',function(req,res){
	console.log('webserver started on ' + process.pid);
	res.send('Hello World');
})
var server = http.createServer(app);
console.log('webserver started on ' + process.pid);

process.on('message',function(msg,socket){
	process.nextTick(function(){
		if(msg == 'c' && socket) {
			socket.readable = socket.writable = true;
			socket.resume();
			server.connections++;
			socket.server = server;			
			server.emit('connection',socket);
			socket.emit('connect');
		}
	})
})
