// Import modules
const express = require('express');
const mongoose = require('mongoose');

// Create express app
const app = express();

// Middleware
app.use(express.json());

// ------------------------------
// 1. Connect to MongoDB
// ------------------------------
mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ------------------------------
// 2. Define Schema
// ------------------------------
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    course: String
});

// ------------------------------
// 3. Create Model
// ------------------------------
const Student = mongoose.model('Student', studentSchema);

// ------------------------------
// 4. CREATE (Insert Data)
// ------------------------------
app.post('/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.json(student);
    } catch (err) {
        res.status(500).send(err);
    }
});

// ------------------------------
// 5. READ (Get All Data)
// ------------------------------
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).send(err);
    }
});

// ------------------------------
// 6. UPDATE
// ------------------------------
app.put('/students/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedStudent);
    } catch (err) {
        res.status(500).send(err);
    }
});

// ------------------------------
// 7. DELETE
// ------------------------------
app.delete('/students/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.send("Student deleted successfully");
    } catch (err) {
        res.status(500).send(err);
    }
});

// ------------------------------
// Start Server
// ------------------------------
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});