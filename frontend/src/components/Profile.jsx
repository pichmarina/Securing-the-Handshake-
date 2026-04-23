function Profile({ user }) {
  return (
    <div className="card">
      <h2>Profile</h2>
      {user ? <p>Logged in as: {user.username}</p> : <p>Not logged in</p>}
    </div>
  );
}

export default Profile;