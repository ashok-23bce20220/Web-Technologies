const tableBody = document.getElementById("studentTable");
const messageDiv = document.getElementById("message");
const form = document.getElementById("studentForm");

let students = [];

// READ (Fetch JSON)
function loadStudents() {

    fetch("students.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Server Error (500)");
            }
            return response.json();  // JSON parsing
        })
        .then(data => {

            if (!data.students) {
                throw new Error("Malformed JSON structure");
            }

            students = data.students;
            displayStudents();
            showMessage("Students Loaded Successfully (200 OK)", "success");

        })
        .catch(error => {
            showMessage("Error: " + error.message, "error");
        });
}

// Display Table
function displayStudents() {

    tableBody.innerHTML = "";

    if (students.length === 0) {
        showMessage("No Students Available", "error");
        return;
    }

    students.forEach((student, index) => {

        tableBody.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.marks}</td>
                <td>
                    <button onclick="updateStudent(${index})">Update</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// CREATE
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("id").value.trim();
    const name = document.getElementById("name").value.trim();
    const course = document.getElementById("course").value.trim();
    const marks = document.getElementById("marks").value.trim();

    // Validation
    if (!id || !name || !course || !marks) {
        showMessage("All fields are required!", "error");
        return;
    }

    if (isNaN(marks) || marks < 0 || marks > 100) {
        showMessage("Marks must be between 0 and 100", "error");
        return;
    }

    // Check duplicate ID
    if (students.some(s => s.id === id)) {
        showMessage("Student ID already exists!", "error");
        return;
    }

    const newStudent = { id, name, course, marks: Number(marks) };

    students.push(newStudent);

    displayStudents();
    showMessage("Student Added Successfully", "success");

    form.reset();
});

// UPDATE
function updateStudent(index) {

    const newMarks = prompt("Enter new marks:");
    const newCourse = prompt("Enter new course:");

    if (newMarks && (!isNaN(newMarks)) && newMarks >= 0 && newMarks <= 100) {
        students[index].marks = Number(newMarks);
    }

    if (newCourse) {
        students[index].course = newCourse;
    }

    displayStudents();
    showMessage("Student Updated Successfully", "success");
}

// DELETE
function deleteStudent(index) {

    if (students[index]) {
        students.splice(index, 1);
        displayStudents();
        showMessage("Student Deleted Successfully", "success");
    } else {
        showMessage("Student Not Found (404)", "error");
    }
}

// Show Message
function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = type;

    setTimeout(() => {
        messageDiv.textContent = "";
    }, 3000);
}

// Load data on start
loadStudents();
