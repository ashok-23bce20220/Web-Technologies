import React, { useState } from "react";

function App() {
  // ✅ State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // ✅ State for errors
  const [errors, setErrors] = useState({});

  // ✅ State for success message
  const [successMsg, setSuccessMsg] = useState("");

  // ✅ Handle input change (onChange)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // ✅ Validation logic
  const validate = () => {
    let newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    return newErrors;
  };

  // ✅ Handle submit
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload

    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      // ✅ Success case
      setSuccessMsg("Form submitted successfully!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: ""
      });

      setErrors({});
    } else {
      // ❌ Error case
      setErrors(validationErrors);
      setSuccessMsg("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Registration Form</h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label>Email:</label><br />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        <br />
        <button type="submit">Submit</button>
      </form>

      {/* Success Message */}
      {successMsg && <h3 style={{ color: "green" }}>{successMsg}</h3>}
    </div>
  );
}

export default App;