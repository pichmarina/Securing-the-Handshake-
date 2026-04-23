import { useState } from "react";
import api from "../api";

function Upload({ csrfToken, onContactAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/contacts", formData, {
        headers: {
          "x-csrf-token": csrfToken,
        },
      });

      setMessage(res.data.message);
      setFormData({ name: "", phone: "" });
      onContactAdded();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add contact");
    }
  };

  return (
    <div className="card">
      <h2>Add Contact</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Contact name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
        />
        <button type="submit">Add Contact</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Upload;