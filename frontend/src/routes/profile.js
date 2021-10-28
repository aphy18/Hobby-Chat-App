import '../styles/Profile.css'
import { useState } from 'react';
import useForm from '../customHooks/useForm.js'
import axios from 'axios';

export default function Profile() {
  
  const { values, setValues, handleChange, handleSubmit } = useForm(handleProfile)
  let userObj = JSON.parse(localStorage.getItem('user'))
  const [profile, setProfile] = useState(false);

  function handleProfile() {
    console.log('changes made')
    setValues({})
  }

  const sendProfileData = () => {
    axios.put(`http://localhost:8080/profile/${userObj.id}`, { values })
    .then((res) => {
      console.log('res.data for profile 14 -->', res.data)
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
  }

  // don't want profile to be dependent on state (it will show you can't be here before logging out)
   if (userObj.username && !profile) {
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
      <button type="button" className="profile-button" onClick={() => setProfile(true)}>Edit</button>
      <button type="button" className="profile-button">Change Password</button>
      <button type="button" className="profile-button">Upload Profile Picture</button>
      </div>
      </form>
      </div>
      </>
     )
   } else if (userObj.username && profile){
     return (
      <>
      <div className="profile-container">
      <form className="profile-form" onSubmit={handleSubmit}>
      <div className="profile-picture">
       <span><i class="fas fa-user"></i></span>
      </div>
      <div className="new-user-info">
       <span>username:</span><textarea name="username" value={values.username} className="new-text" placeholder="enter a new username" onChange={handleChange}></textarea>
       <span>first name:</span><textarea name="first_name" value={values.first_name} className="new-text" placeholder="enter a first name" onChange={handleChange}></textarea>
       <span>last name:</span><textarea name="last_name" value={values.last_name} className="new-text" placeholder="enter a last name" onChange={handleChange}></textarea>
       <span>gender:</span><textarea name="gender" value={values.gender} className="new-text" placeholder="enter a new gender" onChange={handleChange}></textarea>
       <span>address:</span><textarea name="address" value={values.address} className="new-text" placeholder="enter a new address" onChange={handleChange}></textarea>
       <span>email:</span><textarea name="email" value={values.email} className="new-text" placeholder="enter a new email" onChange={handleChange}></textarea>
      </div>
      <div className="bio-container">
        <p className="bio-header">Bio:</p>
        <p className="bio">Hello i am whale i love whales</p>
        {/* <textarea className="bio" placeholder="Talk a bit about yourself"></textarea> */}
      </div>
      <div className="profile-button-container">
      <button className="profile-button" onClick={() => sendProfileData()}>Save Changes</button>
      <button className="profile-button" onClick={() => setProfile(false)}>Cancel</button>
      <button className="profile-button">Change Password</button>
      <button className="profile-button">Upload Profile Picture</button>
      </div>
      </form>
      </div>
      </>
     )
   }
   
  
}