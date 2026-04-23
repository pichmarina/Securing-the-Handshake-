function Profile({ user }) {
  return (
    <div className="card">
      <h2>👤 Profile</h2>
      {user ? (
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "var(--primary-color)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              fontWeight: "bold",
              margin: "0 auto 1rem",
            }}
          >
            {user.username.charAt(0).toUpperCase()}
          </div>
          <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600" }}>
            Logged in as: {user.username}
          </p>
          <p
            style={{
              margin: "0.5rem 0 0 0",
              color: "var(--text-muted)",
              fontSize: "0.9rem",
            }}
          >
            Welcome back! You can now manage your contacts.
          </p>
        </div>
      ) : (
        <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "var(--border-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              margin: "0 auto 1rem",
            }}
          >
            👤
          </div>
          <p style={{ margin: 0 }}>Not logged in</p>
          <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem" }}>
            Please log in to access your contacts.
          </p>
        </div>
      )}
    </div>
  );
}

export default Profile;
