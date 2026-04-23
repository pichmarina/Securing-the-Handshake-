import { useEffect, useState } from "react";
import api from "../api";

function Auth({ onLogin, setCsrfToken }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await api.get("/api/csrf-token");
        setCsrfToken(res.data.csrfToken);
      } catch (_error) {
        setMessage("Failed to fetch CSRF token");
      }
    };

    fetchToken();
  }, [setCsrfToken]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const tokenRes = await api.get("/api/csrf-token");
      const token = tokenRes.data.csrfToken;
      setCsrfToken(token);

      const res = await api.post("/api/login", formData, {
        headers: {
          "x-csrf-token": token,
        },
      });

      setMessage({ type: "success", text: res.data.message });
      onLogin(res.data.user);
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>🔐 Login</h2>
      <form onSubmit={handleLogin} className="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? (
            <>
              <div className="spinner"></div>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <div className="hint">
        💡 <strong>Demo credentials:</strong> username: admin | password: 1234
      </div>
    </div>
  );
}

export default Auth;
