import React, { useState } from "react";
import ItemList from "./ItemList";

function App() {
  // ✅ Array state using useState
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  // ✅ Add item
  const addItem = () => {
    if (input.trim() === "") return;

    const newItem = {
      id: Date.now(), // unique key
      text: input
    };

    setItems([...items, newItem]);
    setInput("");
  };

  // ✅ Remove item
  const removeItem = (id) => {
    const updatedList = items.filter((item) => item.id !== id);
    setItems(updatedList);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dynamic Item List</h2>

      {/* Input Section */}
      <input
        type="text"
        placeholder="Enter item"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addItem}>Add</button>

      {/* Display List */}
      <ItemList items={items} removeItem={removeItem} />
    </div>
  );
}

export default App;