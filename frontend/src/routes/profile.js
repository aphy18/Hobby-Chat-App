import '../styles/Profile.css'
// import axios from 'axios';
// import { useContext } from 'react';
// import { authContext } from '../provider/AuthProvider';


export default function Profile(){
  
  return (
    <>
    <form className="profile-form">
    {/* <div className="profile-container"> */}
    <div className="profile-picture">
     <span><i class="fas fa-user"></i></span>
    </div>
      <p className="profile-item">Username:</p>
      <p className="profile-item">First Name:</p>
      <p className="profile-item">Last Name:</p>
      <p className="profile-item">Gender:</p>
      <p className="profile-item">Address:</p>
      <p className="profile-item">Email:</p>
    {/* </div> */}
    <button>Edit</button>
    <button>Change Password</button>
    <button>Upload Profile Picture</button>
    </form>
    </>
  )
}