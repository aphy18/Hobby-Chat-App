import axios from 'axios';
import useForm from "../customHooks/useForm";
import '../styles/NewHobby.css'

export default function NewHobby() {

  return (
    <>
    <h1>New Hobby</h1>
    <div className='new-hobby-master-container'>
      <div className='new-hobby-container'>
        <form>
          <input name="hobby_name"type="text"></input>
          <input name="level_of_expertise"type="text"></input>
          <input name="my_spending_estimate"type="text"></input>
          <input name="amount_of_time_doing_hobby" type="text"></input>
        </form>
      </div>
    </div>
    </>
  )
  
}