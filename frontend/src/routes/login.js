import '../styles/Login.css'
import '../styles/Body.css'
import { useState, useContext } from 'react';
import useForm from '../customHooks/useForm'
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { authContext } from '../provider/AuthProvider';



export default function Login() {
  const { values, setValues, handleChange, handleSubmit } = useForm(handleLogin);
  const { login } = useContext(authContext)
  const history = useHistory();
  const email = values.email;
  const password = values.password;

  function handleLogin(){
   if (!values.email) {
     console.log('Email required')
     return;
   }

   if (!values.password) {
     console.log('Password required')
     return;
   }
   
   setValues({})
   history.push('/');
  }

  const userLogin = () => {
    axios.post(`http://localhost:8080/login`, { values })
    .then((res) => {
      const userObj = res.data;
      console.log("RES.DATA 22 ---->", userObj)
      if (!userObj) {
        return;
      } else {
        login(email, password, userObj);
      }
    })
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