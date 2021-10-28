import '../styles/Profile.css'

export default function Profile() {
  
  let userObj = JSON.parse(localStorage.getItem('user'))

  // don't want profile to be dependent on state (it will show you can't be here before logging out)
   if (userObj.username) {
    return (
      <>
      <div className="profile-container">
      <form className="profile-form">
      <div className="profile-picture">
       <span><i class="fas fa-user"></i></span>
      </div>
        <p className="profile-item">Username: {userObj.username}</p>
        <p className="profile-item">First Name: {userObj.first_name}</p>
        <p className="profile-item">Last Name: {userObj.last_name}</p>
        <p className="profile-item">Gender: {userObj.person_gender}</p>
        <p className="profile-item">Address: {userObj.person_address}</p>
        <p className="profile-item">Email: {userObj.person_email}</p>
      <button>Edit</button>
      <button>Change Password</button>
      <button>Upload Profile Picture</button>
      </form>
      </div>
      </>
     )
   } else {
     return (
       <p>You cant be here</p>
     )
   }
   
  
}