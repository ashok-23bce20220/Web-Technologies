const tableBody = document.getElementById("empTable");
const messageDiv = document.getElementById("message");
const form = document.getElementById("empForm");

let xmlDoc; // Store XML document

// READ - Load Employees
function loadEmployees() {

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "employees.xml", true);

    xhr.onload = function () {

        if (xhr.status === 200) {

            xmlDoc = xhr.responseXML;

            if (!xmlDoc || !xmlDoc.getElementsByTagName("employee")) {
                showMessage("Malformed or Empty XML", "error");
                return;
            }

            displayEmployees();
            showMessage("Employees Loaded Successfully (200 OK)", "success");

        } else {
            showMessage("Error Loading XML (Status: " + xhr.status + ")", "error");
        }
    };

    xhr.onerror = function () {
        showMessage("Network Error", "error");
    };

    xhr.send();
}

// Display Employees
function displayEmployees() {

    tableBody.innerHTML = "";

    const employees = xmlDoc.getElementsByTagName("employee");

    if (employees.length === 0) {
        showMessage("No Employees Found", "error");
        return;
    }

    for (let i = 0; i < employees.length; i++) {

        const id = employees[i].getElementsByTagName("id")[0].textContent;
        const name = employees[i].getElementsByTagName("name")[0].textContent;
        const dept = employees[i].getElementsByTagName("department")[0].textContent;
        const salary = employees[i].getElementsByTagName("salary")[0].textContent;

        tableBody.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${dept}</td>
                <td>${salary}</td>
                <td>
                    <button onclick="updateEmployee(${i})">Update</button>
                    <button onclick="deleteEmployee(${i})">Delete</button>
                </td>
            </tr>
        `;
    }
}

// CREATE
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const newEmp = xmlDoc.createElement("employee");

    const id = createNode("id", empId.value);
    const name = createNode("name", empName.value);
    const dept = createNode("department", empDept.value);
    const salary = createNode("salary", empSalary.value);

    newEmp.appendChild(id);
    newEmp.appendChild(name);
    newEmp.appendChild(dept);
    newEmp.appendChild(salary);

    xmlDoc.getElementsByTagName("employees")[0].appendChild(newEmp);

    displayEmployees();
    showMessage("Employee Added Successfully", "success");
    form.reset();
});

// UPDATE
function updateEmployee(index) {

    const employees = xmlDoc.getElementsByTagName("employee");

    const newSalary = prompt("Enter new salary:");
    const newDept = prompt("Enter new department:");

    if (newSalary)
        employees[index].getElementsByTagName("salary")[0].textContent = newSalary;

    if (newDept)
        employees[index].getElementsByTagName("department")[0].textContent = newDept;

    displayEmployees();
    showMessage("Employee Updated Successfully", "success");
}

// DELETE
function deleteEmployee(index) {

    const employees = xmlDoc.getElementsByTagName("employee");

    employees[index].parentNode.removeChild(employees[index]);

    displayEmployees();
    showMessage("Employee Deleted Successfully", "success");
}

// Helper function
function createNode(tag, value) {
    const node = xmlDoc.createElement(tag);
    node.appendChild(xmlDoc.createTextNode(value));
    return node;
}

// Show message
function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = type;

    setTimeout(() => {
        messageDiv.textContent = "";
    }, 3000);
}

// Load on start
loadEmployees();
