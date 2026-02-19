const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTable");
const messageDiv = document.getElementById("message");

let students = [];

// READ (Fetch students)
function loadStudents() {
    fetch("students.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("500 Server Error");
            }
            return response.json();
        })
        .then(data => {
            students = data.students;
            renderTable();
            showMessage("Students loaded successfully (200 OK)", "success");
        })
        .catch(error => {
            showMessage(error.message, "error");
        });
}

// Render Table
function renderTable() {
    tableBody.innerHTML = "";

    students.forEach((student, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.department}</td>
                <td>${student.marks}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// CREATE
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const newStudent = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        department: document.getElementById("department").value,
        marks: document.getElementById("marks").value
    };

    students.push(newStudent);
    renderTable();

    showMessage("Student added successfully (200 OK)", "success");

    form.reset();
});

// UPDATE
function editStudent(index) {
    const student = students[index];

    document.getElementById("id").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("department").value = student.department;
    document.getElementById("marks").value = student.marks;

    students.splice(index, 1);

    showMessage("Modify details and click Add to update (200 OK)", "success");
}

// DELETE
function deleteStudent(index) {
    if (students[index]) {
        students.splice(index, 1);
        renderTable();
        showMessage("Student deleted successfully (200 OK)", "success");
    } else {
        showMessage("Student not found (404)", "error");
    }
}

// Message Display
function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = type;

    setTimeout(() => {
        messageDiv.textContent = "";
    }, 3000);
}

// Load students on page load
loadStudents();
