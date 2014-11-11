var http = require('http');
var fork = require('child_process').fork;
var cpus = require('os').cpus();
var net = require('net');
var workers = [];
for(var i=0;i<cpus.length;i++) {
	workers.push(fork('./worker.js'));
}

net.createServer(function(s){
	s.pause();
	var worker = workers.shift();
	worker.send('c',s);
	workers.push(worker);
}).listen(3000);