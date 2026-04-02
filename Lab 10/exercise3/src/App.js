import React, { useEffect, useState } from "react";
import DataList from "./DataList";

function App() {
  // ✅ State for data
  const [data, setData] = useState([]);

  // ✅ Loading state
  const [loading, setLoading] = useState(true);

  // ✅ Error state
  const [error, setError] = useState("");

  // ✅ Fetch API using useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();

        setData(result.slice(0, 10)); // limit data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // ✅ runs only once

  // ✅ Conditional rendering
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>API Data Fetch Example</h2>

      {/* Display Data */}
      <DataList data={data} />
    </div>
  );
}

export default App;