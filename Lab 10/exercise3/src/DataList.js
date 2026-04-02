import React from "react";

function DataList({ data }) {
  return (
    <div>
      <h3>Fetched Data</h3>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataList;