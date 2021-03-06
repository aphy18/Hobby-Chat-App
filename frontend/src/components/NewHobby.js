import { useEffect, useState } from 'react';
import axios from 'axios';
import useForm from "../customHooks/useForm";
import '../styles/NewHobby.css';


export default function NewHobby() {

  const { values, handleChange, handleSubmit } = useForm(handleNewHobby)
  let userObj = JSON.parse(localStorage.getItem('user'))
  const [hobbyState,setHobbyState] = useState([])

  async function getUserData(){
    const userData = await axios.get(`http://localhost:8080/hobby/${userObj.id}`)
    console.log('userdata.data', userData.data)
    setHobbyState(userData.data[0])
  }

  console.log('hobby state is.. 18', hobbyState)

  useEffect(() => {
    getUserData();
  }, [])

  function handleNewHobby() {
    values.person_id = hobbyState.person_id
    axios.post(`http://localhost:8080/hobby/${userObj.id}`, { values })
    console.log('hobby submitted')
    console.log('updated values --> 29', values)
    window.location.href=`/profile/${userObj.id}`
  }

  console.log('values 32', values)
  return (
    <>
    <div className='new-hobby-master-container'>
      <h1 className="new-hobby-header">New Hobby</h1>
      <div className='new-hobby-container'>
        <form className="new-hobby-form" onSubmit={handleSubmit}>
          <input name="hobby_name" value={values.hobby_name} type="text" className="new-hobby-input" onChange={handleChange} placeholder='name'></input>
          <select name="level_of_expertise" value={values.level_of_expertise} className="new-hobby-input" onChange={handleChange}>
          <option>Select an Experience Level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Experienced</option>
          </select>
          <input name="my_spending_estimate" value={values.my_spending_estimate} type="text" className="new-hobby-input" onChange={handleChange} placeholder='spending estimate'></input>
          <input name="amount_of_time_doing_hobby" value={values.amount_of_time_doing_hobby} type="text" className="new-hobby-input" onChange={handleChange} placeholder='time spent doing hobby'></input>
          <button className="new-hobby-button">Submit</button>
        </form>
      </div>
    </div>
    </>
  )
  
}