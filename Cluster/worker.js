var http = require('http');

var server = http.createServer(function(req,res){
	console.log('request on ' + process.pid + '#current connections ' + server.connections)
	res.writeHead(200,{'Content-Type' : 'text/plain'});
	res.end('Hello World');
})
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

