import React from "react";

function ItemList({ items, removeItem }) {
  // ✅ Handle empty list
  if (items.length === 0) {
    return <p>No items available</p>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.text}
          <button onClick={() => removeItem(item.id)}> ❌ </button>
        </li>
      ))}
    </ul>
  );
}

export default ItemList;