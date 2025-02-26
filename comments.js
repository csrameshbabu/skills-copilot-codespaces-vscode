// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const comments = require('./comments');

// Create server
const server = http.createServer((req, res) => {
    // Get request method
    const method = req.method;

    // Get request URL
    const urlObj = url.parse(req.url, true);
    const pathname = urlObj.pathname;

    // Get query string
    const query = urlObj.query;

    // Get file path
    const filePath = path.join(__dirname, pathname);

    // Handle GET request
    if (method === 'GET') {
        // If request URL is /comments
        if (pathname === '/comments') {
            // Send comments
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(comments));
        } else {
            // Read file
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.statusCode = 404;
                    res.end('Not found');
                } else {
                    res.end(data);
                }
            });
        }
    }

    // Handle POST request
    if (method === 'POST') {
        if (pathname === '/comments') {
            // Read data
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            });

            req.on('end', () => {
                // Parse JSON
                const comment = JSON.parse(data);

                // Add comment to comments
                comments.push(comment);

                // Send response
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(comment));
            });
        }
    }
});

// Listen on port 3000
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});