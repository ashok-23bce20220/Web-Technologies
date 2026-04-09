// Import express module
const express = require('express');

// Create express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Sample data (users)
let users = [
    { id: 1, name: "Ashok" },
    { id: 2, name: "Ravi" }
];

// 1. GET all users
app.get('/users', (req, res) => {
    res.json(users);
});

// 2. GET single user (Route parameter)
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    
    if (!user) {
        return res.status(404).send("User not found");
    }
    
    res.json(user);
});

// 3. POST - Add new user
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// 4. PUT - Update user
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).send("User not found");
    }

    user.name = req.body.name;
    res.json(user);
});

// 5. DELETE - Remove user
app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.send("User deleted successfully");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});