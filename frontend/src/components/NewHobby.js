import { useEffect, useState } from 'react';
import axios from 'axios';
import useForm from "../customHooks/useForm";
import '../styles/NewHobby.css'

export default function NewHobby() {

  const {values, handleChange, handleSubmit } = useForm(handleNewHobby)
  let userObj = JSON.parse(localStorage.getItem('user'))
  const [hobbyState,setHobbyState] = useState([])

  async function getUserData(){
    const userData = await axios.get(`http://localhost:8080/hobby/${userObj.id}`)
    console.log('userdata.data', userData.data)
    setHobbyState(userData.data[0])
  }

  console.log('hobby state is..', hobbyState)

  useEffect(() => {
    getUserData()
  }, [])

  function handleNewHobby() {
    values.id = hobbyState.id
    values.person_id = hobbyState.person_id
    axios.post(`http://localhost:8080/hobby/${userObj.id}`)
    console.log('hobby submitted')
    console.log('updated values -->', values)
  }

  console.log('values', values)
  return (
    <>
    <h1>New Hobby</h1>
    <div className='new-hobby-master-container'>
      <div className='new-hobby-container'>
        <form className="new-hobby-form" onSubmit={handleSubmit}>
          <input name="hobby_name" value={values.hobby_name} type="text" className="new-hobby-input" onChange={handleChange} placeholder='name'></input>
          <input name="level_of_expertise" value={values.level_of_expertise} type="text" className="new-hobby-input" onChange={handleChange} placeholder='level of expertise'></input>
          <input name="my_spending_estimate" value={values.my_spending_estimate} type="text" className="new-hobby-input" onChange={handleChange} placeholder='spending estimate'></input>
          <input name="amount_of_time_doing_hobby" value={values.amount_of_time_doing_hobby} type="text" className="new-hobby-input" onChange={handleChange} placeholder='time doing hobby'></input>
          <button className="new-hobby-button">Submit</button>
        </form>
      </div>
    </div>
    </>
  )
  
}