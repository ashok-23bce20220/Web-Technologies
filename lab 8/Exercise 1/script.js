// Declaring variables using let
let studentName = "Ashok";
let mark1 = 85;
let mark2 = 90;
let mark3 = 88;

// Arrow function to calculate average
const calculateAverage = (m1, m2, m3) => {
    return (m1 + m2 + m3) / 3;
};

// Calculate total marks
let totalMarks = mark1 + mark2 + mark3;

// Calculate average
let average = calculateAverage(mark1, mark2, mark3);

// Display results using template literals
console.log(`Student Name: ${studentName}`);
console.log(`Total Marks: ${totalMarks}`);
console.log(`Average Marks: ${average}`);