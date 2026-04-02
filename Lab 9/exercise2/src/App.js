import React from "react";
import StudentCard from "./components/StudentCard";

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Student Cards</h2>

      <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap"
      }}>
        <StudentCard name="Ashok" department="CSE" marks="85" />
        <StudentCard name="Ravi" department="ECE" marks="90" />
        <StudentCard name="Priya" department="IT" marks="88" />
      </div>
    </div>
  );
}

export default App;