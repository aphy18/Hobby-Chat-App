import '../styles/Profile.css'
import { useState, useEffect } from 'react';
import useForm from '../customHooks/useForm.js'
import axios from 'axios';

export default function Profile() {
  const { values, setValues, handleChange, handleSubmit } = useForm(handleProfile)
  let userObj = JSON.parse(localStorage.getItem('user'))
  const [profile, setProfile] = useState(false);
  const [data, setData] = useState({});


  function sendProfileData(){
    for (let attr in data) {
      console.log('attr', attr);
      console.log('almost ripping my hair out --->', values[attr]);
      if (!values[attr]) {
        values[attr] = data[attr];
      }
    }
    const updateUserData = axios.put(`http://localhost:8080/profile/${userObj.id}`, { values })
    setProfile(false);
    localStorage.setItem('user',JSON.stringify(values))
    return updateUserData;
  }

  async function getProfileData(){
    if (userObj === null) {
      console.log('end of the road');
      return;
    }
  // the entire axios link is the response itself
    const getUserData = await axios.get(`http://localhost:8080/profile/${userObj.id}`, { values })
    return setData(getUserData.data)

  }
    
    useEffect(() => {

    getProfileData();

  },[])
  
  console.log('i am data -->',data)
 
  function handleProfile() {
    console.log('form submitted')
  }

  if (!userObj && !profile) {
    return (
      <p>You must be logged in to view your profile</p>
    )
  } else if (data && !profile) {
    return (
      <>
      <div className="profile-container">
      <form className="profile-form">
      <div className="profile-picture">
       <span><i class="fas fa-user"></i></span>
      </div>
      <div className="user-info">
      <p className="profile-item">Username: {data.username}</p>
        <p className="profile-item">First Name: {data.first_name}</p>
        <p className="profile-item">Last Name: {data.last_name}</p>
        <p className="profile-item">Gender: {data.person_gender}</p>
        <p className="profile-item">Address: {data.person_address}</p>
        <p className="profile-item">Email: {data.person_email}</p>
      </div>
      <div className="bio-container">
        <p className="bio-header">Bio:</p>
        <p className="bio">Hello i am whale i love whales</p>
        {/* <textarea className="bio" placeholder="Talk a bit about yourself"></textarea> */}
      </div>
      </form>
      <div className="profile-button-container">
      <button className="profile-button" onClick={() => setProfile(true)}>Edit</button>
      <button className="profile-button">Change Password</button>
      <button className="profile-button">Upload Profile Picture</button>
      </div>
      </div>
      </>
     )
   } if (data && profile) {
  
    console.log('values 86 -->', values)

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
       <span>gender:</span><textarea name="person_gender" value={values.gender} className="new-text" placeholder="enter a new gender" onChange={handleChange}></textarea>
       <span>address:</span><textarea name="person_address" value={values.address} className="new-text" placeholder="enter a new address" onChange={handleChange}></textarea>
       <span>email:</span><textarea name="person_email" value={values.email} className="new-text" placeholder="enter a new email" onChange={handleChange}></textarea>
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