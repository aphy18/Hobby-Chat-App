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
      <div className="user-info">
        <p className="profile-item">Username: {userObj.username}</p>
        <p className="profile-item">First Name: {userObj.first_name}</p>
        <p className="profile-item">Last Name: {userObj.last_name}</p>
        <p className="profile-item">Gender: {userObj.person_gender}</p>
        <p className="profile-item">Address: {userObj.person_address}</p>
        <p className="profile-item">Email: {userObj.person_email}</p>
      </div>
      <div className="bio-container">
        <p className="bio-header">Bio:</p>
        <p className="bio">Hello i am whale i love whales</p>
        {/* <textarea className="bio" placeholder="Talk a bit about yourself"></textarea> */}
      </div>
      <div className="profile-button-container">
      <button className="profile-button">Edit</button>
      <button className="profile-button">Change Password</button>
      <button className="profile-button">Upload Profile Picture</button>
      </div>
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