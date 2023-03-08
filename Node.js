const http = require('http');
const fs = require('fs');
const path = require('path');

//The createServer accepts requests form the client (browser)
const server = http.createServer((request, response) => {
	let filePath = request.url;
	switch(filePath){
		case '/':
		case "/index.html":
			filePath = './index.html';
			break
		case "/scripts.js":
			filePath = './scripts.js';
			break
		case "/index.css":
			filePath = './index.css';
			break
		default:
			filePath = filePath.includes('/country-objects') ? `.${filePath}` : `./country-objects${filePath}`;
	}
	console.log(filePath)

	//Specifies the specific file content type
	const contentType = {
	'.html': 'text/html',
	'.json': 'application/json',
	'.js': 'text/javascript',
	'.css': 'text/css',
	}[String(path.extname(filePath)).toLowerCase()];

	fs.readFile(filePath, (err, data) => {
	//checks for errorcode 404 to check whether the file doesnot exist
	if (err) {
		if (err.code === 'ENOENT') {
			response.writeHead(404);
			response.end('File not found');
		}
	} else {
		response.writeHead(200, { 'Content-Type': contentType });
		response.end(data, 'utf-8');
	}
	});
}).listen(8081);
console.log('Server running at http://127.0.0.1:8081/');



