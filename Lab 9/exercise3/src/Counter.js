import React, { useState } from "react";

function Counter() {
  // State initialization
  const [count, setCount] = useState(0);

  // Increment function
  const handleIncrement = () => {
    setCount(count + 1);
  };

  // Decrement function
  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Counter Application</h2>

      {/* Display current value */}
      <h1>{count}</h1>

      {/* Buttons */}
      <button onClick={handleIncrement} style={{ margin: "10px", padding: "10px" }}>
        Increment
      </button>

      <button onClick={handleDecrement} style={{ margin: "10px", padding: "10px" }}>
        Decrement
      </button>
    </div>
  );
}

export default Counter;