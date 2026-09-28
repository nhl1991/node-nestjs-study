//COMMONJS

const http = require('http');
const fs = require('fs').promises

http.createServer(async (req, res) => {
    try {
        const data = await fs.readFile('./server2.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(data);
    } catch (e) {
        console.error(e); // error
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end(e.message)
    }
}).listen(8081, () => {
    console.log('Server is running on http://localhost:8081')
})