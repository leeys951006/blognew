const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    const filePath = path.join(__dirname, '/public/html/main.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Error reading main.html:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
        return;
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });
  } else if (req.method === 'GET' && req.url === '/css/main.css') {
    const filePath = path.join(__dirname, '/public/css/main.css');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Error reading styles.css:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
        return;
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/css');
      res.end(data);
    });
  } else if (req.method === 'GET' && req.url === '/js/main.js') {
    const filePath = path.join(__dirname, '/public/js/main.js');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Error reading main.js:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
        return;
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/javascript');
      res.end(data);
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
