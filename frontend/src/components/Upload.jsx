import { useState } from "react";
import api from "../api";

function Upload({ csrfToken, onContactAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/api/contacts", formData, {
        headers: {
          "x-csrf-token": csrfToken,
        },
      });

      setMessage({ type: "success", text: res.data.message });
      setFormData({ name: "", phone: "" });
      onContactAdded();
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to add contact" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>➕ Add Contact</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Contact Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter contact name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? (
            <>
              <div className="spinner"></div>
              Adding Contact...
            </>
          ) : (
            "Add Contact"
          )}
        </button>
      </form>
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}

export default Upload;