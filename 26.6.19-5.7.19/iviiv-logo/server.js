// var http = require('http');
// var url = require('url');
// var querystring = require('querystring');
// var static = require('node-static');
// var file = new static.Server('.', {
// cache: 0
// });


// function accept(req, res) {
// 	req.on('data', function (data) {
// 		console.log("Partial body: " + data);
// 	});

// 	try {
// 		if (req.headers.echo) void (0);
// 	} catch (error) {
// 		res.setHeader("echo", req.headers.echo);
// 	}
// 	file.serve(req, res);
// }


// // ------ запустить сервер -------

// if (!module.parent) {
// 	http.createServer(accept).listen(80);
// } else {
// 	exports.accept = accept;
// }






// var app = function (req, res) {
//   res.writeHead(200);
//   res.end("hello world\n");
//   file.serve(req, res);
// }
// http.createServer(app).listen(80);
// https.createServer(httpsOptions, app).listen(443);


var http = require('http');
// var https = require('https');
var url = require('url');
var querystring = require('querystring');
var static = require('node-static');
var file = new static.Server('.', {
	cache: 0
});
var fs = require('fs');

function accept(req, res) {
	if (req.headers.echo) {
		res.writeHead(200, { 'echo': req.headers.echo });
		res.end();
		return;
	} else {
		req.on('data', (chunk) => {
			console.log(chunk.toString() );
		});
	}
	file.serve(req, res);
}
/* var httpsOptions = {
	key: fs.readFileSync('../../certs/win-acme/myhost.dns-updater.164.gr-key.pem'),
	cert: fs.readFileSync('../../certs/win-acme/myhost.dns-updater.164.gr-chain.pem')
}; */

// ------ запустить сервер -------

if (!module.parent) {
	http.createServer(accept).listen(8080);
	// https.createServer(httpsOptions, accept).listen(443);
} else {
	exports.accept = accept;
}