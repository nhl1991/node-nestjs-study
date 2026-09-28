const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.write('<h1>Hello World</h1>');
    res.end('<p>Hello Server!</p>');
}).listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});



http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.write('<h1>Hello Node</h1>');
    res.end('<p>Hello Server!</p>');
}).listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
