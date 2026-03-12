// Create a student object
const student = {
    id: 101,
    name: "Anil",
    department: "CSE",
    marks: 92
};

// Object Destructuring
const { id, name, department, marks } = student;

// Display extracted values
console.log("Student Details:");
console.log(id, name, department, marks);

// Create new object using Spread Operator
const updatedStudent = {
    ...student,
    grade: "A"
};

// Display updated object
console.log("Updated Student Object:");
console.log(updatedStudent);