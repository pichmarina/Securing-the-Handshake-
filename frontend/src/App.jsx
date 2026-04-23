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

  const handleLogin = async (loggedInUser) => {
    setUser(loggedInUser);
    fetchContacts();
  };

  const fetchContacts = async () => {
    try {
      const res = await api.get("/api/contacts");
      setContacts(res.data.contacts);
    } catch (error) {
      console.error("Failed to fetch contacts");
    }
  };

  return (
    <div className="app">
      <h1>Secure Phone Book SPA</h1>

      <div className="grid">
        <Auth onLogin={handleLogin} setCsrfToken={setCsrfToken} />
        <Profile user={user} />
      </div>

      {user && (
        <>
          <Upload csrfToken={csrfToken} onContactAdded={fetchContacts} />
          <Feed contacts={contacts} />
        </>
      )}
    </div>
  );
}

export default App;