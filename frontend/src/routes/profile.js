import '../styles/Profile.css'
import { useState, useEffect } from 'react';
import useForm from '../customHooks/useForm.js'
import axios from 'axios';
import Hobby from '../components/Hobby.js'

export default function Profile() {
  const { values, handleChange, handleSubmit } = useForm(handleProfile)
  let userObj = JSON.parse(localStorage.getItem('user'))
  
  const [profile, setProfile] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [hobbyData, setHobbyData] = useState([]);
  const [textLength, setTextLength] = useState(0);
  // const [disabled, setDisabled] = useState(true)
 

  function sendProfileData(){
    for (let attr in profileData) {
      if (!values[attr]) {
        values[attr] = profileData[attr];
      }
    }
    axios.put(`http://localhost:8080/profile/${userObj.id}`, { values })
    setProfile(false);
    localStorage.setItem('user',JSON.stringify(values))
    alert('changes saved')
    window.location.reload()
  }

  async function getProfileData() {
    if (userObj === null) {
      console.log('end of the road');
      return;
    }
    const getUserData = await axios.get(`http://localhost:8080/profile/${userObj.id}`, { values });
    setProfileData(getUserData.data[0]);
    setHobbyData(getUserData.data);
  }
    
    useEffect(() => {
      getProfileData();
    },[])

    

    useEffect(() => {
    if (values.person_bio) {
      setTextLength(values.person_bio.length)
    }
    },[values])
  

    console.log('THIS PROFILE DATA -->', profileData)
 
  function handleProfile() {
    console.log('form submitted')
  }

  

  if (profileData && !profile) {
    return (
      <>
      <div className="profile-container">
      <div className="profile-button-container">
      <button className="profile-button" onClick={() => setProfile(true)}>Edit</button>
      <a href={`/hobby/${userObj.id}`}><button className="profile-button">Add Hobby</button></a> 
      <a href="/changepassword"><button className="profile-button">Change Password</button></a>
      <button className="profile-button">Upload Profile Picture</button>
      </div>
      <div className="profile-and-hobby-container">
      <form className="profile-form">
      <div className="profile-picture">
       <span><i class="fas fa-user"></i></span>
      </div>
      <div className="user-info">
      <p className="profile-item">Username: {profileData.username}</p>
        <p className="profile-item">First Name: {profileData.first_name}</p>
        <p className="profile-item">Last Name: {profileData.last_name}</p>
        <p className="profile-item">Gender: {profileData.person_gender}</p>
        <p className="profile-item">Address: {profileData.person_address}</p>
        <p className="profile-item">Email: {profileData.person_email}</p>
      </div>
      <div className="bio-container">
        <p className="bio-header">Bio:</p>
        <p className="bio"> {profileData.person_bio}</p>
      </div>
      </form>
      <div className="hobby-form" id="hobby-form">
        <div className="hobby-header-container">
          <h3 className="hobby-header">Hobbies</h3>
          {/* <span className="hobby-underline"></span> */}
        </div>
        <div className="hobby-info-container">
          <Hobby hobbyData={hobbyData}/>
       </div>
      </div>
      </div>
      </div>
      </>
     )
   } else if (profileData && profile) {
  
    console.log('values 86 -->', values)

     return (
      <>
      <div className="profile-container">
      <div className="profile-button-container">
      <button className="profile-button" onClick={() => sendProfileData()}>Save Changes</button>
      <button className="profile-button" onClick={() => setProfile(false)}>Cancel</button>
      <button className="profile-button">Change Password</button>
      <button className="profile-button">Upload Profile Picture</button>
      </div>
      <form className="new-profile-form" onSubmit={handleSubmit}>
      <div className="profile-picture">
       <span><i class="fas fa-user"></i></span>
      </div>
      <div className="new-user-info">
       <span>username:</span><textarea name="username" value={values.username} className="new-text" placeholder="enter a new username" onChange={handleChange}></textarea>
       <span>first name:</span><textarea name="first_name" value={values.first_name} className="new-text" placeholder="enter a first name" onChange={handleChange}></textarea>
       <span>last name:</span><textarea name="last_name" value={values.last_name} className="new-text" placeholder="enter a last name" onChange={handleChange}></textarea>
       <span>gender:</span><textarea name="person_gender" value={values.gender} className="new-text" placeholder="enter a new gender" onChange={handleChange}></textarea>
       <span>address:</span><textarea name="person_address" value={values.address} className="new-text" placeholder="enter a new address" onChange={handleChange}></textarea>
       <span>email:</span><textarea name="person_email" value={values.email} className="new-text" placeholder="enter a new email" onChange={handleChange}></textarea>
      </div>
      <div className="bio-container">
        <p className="bio-header">Bio:</p>
        <textarea name="person_bio" value={values.bio} className="bio" onChange={handleChange} placeholder="Talk a bit about yourself"></textarea>
        <p>{textLength}/100</p>
      </div>
      </form>
      </div>
      </>
     )
   }
  }