import '../styles/Login.css'
import '../styles/Body.css'
import { useState } from 'react';
import useForm from '../customHooks/useForm'
import axios from 'axios';
import { useHistory } from 'react-router-dom'



export default function Login() {
  const { values, setValues, handleChange, handleSubmit } = useForm(handleLogin);
  const [user, isUserLoggedIn] = useState(false);
  const history = useHistory();

  function handleLogin(){
   if (!values.email) {
     console.log('Email required')
     return;
   }

   if (!values.password) {
     console.log('Password required')
     return;
   }
   isUserLoggedIn(true);
   setValues({})
   history.push('/')
  }

  function userLogin() {
    const sendData = async () => {
      const formData = await Promise.all([
        axios.post(`http://localhost:8080/login`, { values })
      ])
      await console.log('response data -->', formData)
      return formData.data;
    }
    sendData()
  }
  return (
  <>
   <div className="master-login-container">
    <div className="login-container">
     <h1 className="login"><i>Login</i></h1>
     <form className="login-form" onSubmit={handleSubmit}>
       <input type="email" name="email" placeholder="email"className="input-field" onChange={handleChange} required></input>
       <input type="password" name="password" placeholder="password" className="input-field" onChange={handleChange}  required></input>
       <button type="submit" className="form-button-submit" onClick={userLogin}>Submit</button>
     </form>
   </div>
   </div>
   </>
  )
}