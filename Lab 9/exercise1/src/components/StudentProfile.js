import React from "react";

function StudentProfile() {
  // Student details (variables)
  const name = "Ashok";
  const department = "Computer Science Engineering";
  const year = "3rd Year";
  const section = "A";

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Student Profile</h2>

      <p><strong>Name:</strong> {name}</p>
      <p><strong>Department:</strong> {department}</p>
      <p><strong>Year:</strong> {year}</p>
      <p><strong>Section:</strong> {section}</p>
    </div>
  );
}

export default StudentProfile;