import React from "react";

function StudentCard({ name, department, marks }) {
  return (
    <div style={{
      border: "1px solid black",
      borderRadius: "10px",
      padding: "15px",
      margin: "10px",
      width: "250px",
      textAlign: "center"
    }}>
      <h3>{name}</h3>
      <p>Department: {department}</p>
      <p>Marks: {marks}</p>
    </div>
  );
}

export default StudentCard;