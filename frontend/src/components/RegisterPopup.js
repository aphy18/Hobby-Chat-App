import React from 'react'
import '../styles/Popup.css'
import Aos from "aos";
import { useState, useEffect } from 'react';
import useForm from '../customHooks/useForm';
import axios from 'axios';
import MoonLoader from "react-spinners/MoonLoader";

// make a /setup page

export default function RegisterPopup(props) {

  const currentUserID = props.user.id
  const { values, setValues, handleChange, handleSubmit } = useForm(submitRegistration)
  const [formSubmit,setFormSubmit] = useState(false);
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)

  function submitRegistration(){
    if (!values.hobby_name || !values.amount_of_time || !values.level_of_expertise|| !values.my_spending_estimate) {
      setError('please fill out all fields')
      return;
    }

    axios.post('http://localhost:8080/firsthobby', { values, currentUserID })
    setValues({})
    console.log('submitted the form')
    setFormSubmit(true)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    },2000)

  }

  useEffect(() => {
    Aos.init({duration: 500})
  })

  console.log('values 24', values)

  if (loading && formSubmit) {
    return (
      <div className='registration-hobby-container'>
        <p>One Moment....</p>
        <MoonLoader size={50} />
      </div>
    )
  } else if (!loading && formSubmit) {
    return (
      <div className='registration-hobby-container'>
        <p>Ok you're all set</p>
        <a href='/login'>Click here to login</a>
      </div>
    )
  }


  return (
      <>
      <div className='registration-hobby-container' data-aos='zoom-in'>
        <p>To start fill in a hobby</p>
        <form className='register-hobby-form' onSubmit={handleSubmit}>
          <label>Hobby Name</label>
          <input className='register-hobby-input' type="text" name="hobby_name" value={values.hobby_name} onChange={handleChange} placeholder='drawing'></input>
          <label>Your Expertise Level</label>
          <select className='register-hobby-input' name="level_of_expertise" value={values.level_of_expertise} className="" onChange={handleChange}>
          <option>Select an Experience Level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Experienced</option>
          </select>
          <label>Spending Estimate</label>
          <input className='register-hobby-input' type="text" name="my_spending_estimate" value={values.my_spending_estimate} onChange={handleChange} placeholder='$100'></input>
          <label>Time Spent Doing Hobby</label>
          <input className='register-hobby-input' type="text" name="amount_of_time" value={values.amount_of_time} onChange={handleChange} placeholder='2 years'></input>
          {error ? <p className='err'>{error}</p> : null}
          <button>Submit</button>
        </form>
      </div>
      </>
    )
}
