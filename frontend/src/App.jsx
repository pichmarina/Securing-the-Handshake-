import { useState } from "react";
import Auth from "./components/Auth";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Upload from "./components/Upload";
import api from "./api";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [csrfToken, setCsrfToken] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (loggedInUser) => {
    setUser(loggedInUser);
    fetchContacts();
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/contacts");
      setContacts(res.data.contacts);
    } catch (_error) {
      console.error("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Secure Phone Book SPA</h1>
        <p className="app-subtitle">
          A modern, secure contact management application
        </p>
      </header>

      <div className="main-content">
        <Auth onLogin={handleLogin} setCsrfToken={setCsrfToken} />
        <Profile user={user} />
      </div>

      {user && (
        <div className="secondary-content">
          <Upload csrfToken={csrfToken} onContactAdded={fetchContacts} />
          <Feed contacts={contacts} loading={loading} />
        </div>
      )}
    </div>
  );
}

export default App;
