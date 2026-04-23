function Feed({ contacts, loading }) {
  return (
    <div className="card">
      <h2>📞 Contacts Feed</h2>
      {loading ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div
            className="spinner"
            style={{ width: "32px", height: "32px", margin: "0 auto 1rem" }}
          ></div>
          <p style={{ margin: 0, color: "var(--text-muted)" }}>
            Loading contacts...
          </p>
        </div>
      ) : contacts.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "var(--text-muted)",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
          <p style={{ margin: 0, fontSize: "1.1rem" }}>No contacts yet.</p>
          <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem" }}>
            Add your first contact using the form above.
          </p>
        </div>
      ) : (
        <ul className="contact-list">
          {contacts.map((contact) => (
            <li key={contact.id} className="contact-item">
              <div className="contact-avatar">
                {contact.name.charAt(0).toUpperCase()}
              </div>
              <div className="contact-info">
                <p className="contact-name">{contact.name}</p>
                <p className="contact-phone">{contact.phone}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Feed;
