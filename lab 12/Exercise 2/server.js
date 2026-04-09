// Import express
const express = require('express');

// Create app
const app = express();

// ------------------------------
// 1. Global Middleware
// ------------------------------
app.use((req, res, next) => {
    const time = new Date().toLocaleString();
    console.log(`[GLOBAL] ${req.method} ${req.url} - ${time}`);
    next(); // move to next middleware
});

// ------------------------------
// 2. Another Global Middleware
// ------------------------------
app.use((req, res, next) => {
    console.log("[GLOBAL] Second middleware executed");
    next();
});

// ------------------------------
// 3. Route-level Middleware
// ------------------------------
const checkAuth = (req, res, next) => {
    console.log("[ROUTE] Authentication middleware");

    // Example condition
    const isLoggedIn = true;

    if (isLoggedIn) {
        next(); // allow access
    } else {
        res.send("Access Denied");
    }
};

// ------------------------------
// 4. Routes
// ------------------------------

// Normal route
app.get('/', (req, res) => {
    res.send("Home Page");
});

// Route with middleware
app.get('/dashboard', checkAuth, (req, res) => {
    res.send("Welcome to Dashboard");
});

// Another route
app.get('/about', (req, res) => {
    res.send("About Page");
});

// ------------------------------
// Start Server
// ------------------------------
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});