export default function Profile(){
  return (
    <>
    <h1>Profile Page</h1>
    <div className="profile-container">
      <p className="profile-item">Username:</p>
      <p className="profile-item">First Name:</p>
      <p className="profile-item">Last Name:</p>
      <p className="profile-item">Gender:</p>
      <p className="profile-item">Email:</p>
    </div>
    <button>Edit</button>
    <button>Change Password</button>
    </>
  )
}