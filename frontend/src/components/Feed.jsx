function Feed({ contacts }) {
  return (
    <div className="card">
      <h2>Contacts Feed</h2>
      {contacts.length === 0 ? (
        <p>No contacts yet.</p>
      ) : (
        <ul className="contact-list">
          {contacts.map((contact) => (
            <li key={contact.id}>
              <strong>{contact.name}</strong> - {contact.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Feed;