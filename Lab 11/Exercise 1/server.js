// Import required module using require()
const http = require('http');

// Define port number
const PORT = 5000;

// Create server using createServer()
const server = http.createServer((req, res) => {

    // Set response header
    res.setHeader('Content-Type', 'text/html');

    // Handle client requests using request-response callback
    if (req.url === '/') {
        res.write('<h1>Welcome to Node.js Server</h1>');
        res.write('<p>This is Home Page</p>');
    } 
    else if (req.url === '/about') {
        res.write('<h1>About Page</h1>');
        res.write('<p>This is About Page</p>');
    } 
    else {
        res.write('<h1>404 Not Found</h1>');
    }

    // End response
    res.end();
});

// Run server using listen()
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});