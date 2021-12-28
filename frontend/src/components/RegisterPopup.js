import React from 'react'
import '../styles/Popup.css'
import Aos from "aos";
import { useEffect } from 'react';
import useForm from '../customHooks/useForm';

// make a /setup page

export default function RegisterPopup() {

  const { values, setValues, handleChange, handleSubmit } = useForm(submitRegistration)

  function submitRegistration(){

  }

  useEffect(() => {
    Aos.init({duration: 500})
  })


  return (
      <>
      <div className='registration-hobby-container' data-aos='zoom-in'>
        <p>To start fill in a hobby</p>
        <form className='register-hobby-form' onSubmit={handleSubmit}>
          <label>Hobby Name</label>
          <input className='register-hobby-input' type="text" name="hobby_name" value={values.hobby_name} onChange={handleChange}></input>
          <label>Your Expertise Level</label>
          <select className='register-hobby-input' name="level_of_expertise" value={values.level_of_expertise} className="" onChange={handleChange}>
          <option>Select an Experience Level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Experienced</option>
          </select>
          <label>Spending Estimate</label>
          <input className='register-hobby-input' type="text" name="my_spending_estimate" value={values.my_spending_estimate} onChange={handleChange}></input>
          <label>Time Spent Doing Hobby</label>
          <input className='register-hobby-input' type="text" name="amount_of_time" value={values.amount_of_time} onChange={handleChange}></input>
          <button>Submit</button>
        </form>
      </div>
      </>
    )
}
