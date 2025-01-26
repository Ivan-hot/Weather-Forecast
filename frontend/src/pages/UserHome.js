import "../styles/App.css";
export default function UserHome({ userData }) {
  console.log('UserHome received userData:', userData);

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./login";
  };

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div>
          <h2>User Profile</h2>
          <p><strong>Name:</strong> {userData.fname || 'N/A'}</p>
          <p><strong>Email:</strong> {userData.email || 'N/A'}</p>
          <br />
          <button onClick={logOut} className="btn btn-primary">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
