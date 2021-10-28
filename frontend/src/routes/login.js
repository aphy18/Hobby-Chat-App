import '../styles/Login.css'
import '../styles/Body.css'
import { useState, useContext } from 'react';
import useForm from '../customHooks/useForm'
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { authContext } from '../provider/AuthProvider';



export default function Login(props) {
  const { values, setValues, handleChange, handleSubmit } = useForm(handleLogin);
  const { login } = useContext(authContext)
  const history = useHistory();
  const email = values.email;
  const password = values.password;
  const [loginValidation, setLoginValidation] = useState(false)
  
  // console logs are saved when we push to the 'frozen world' the window.histroy.go() refreshes the page



   function handleLogin(){
   if (!values.email) {
     console.log('Email required')
     return;
   }

   if (!values.password) {
     console.log('Password required')
     return;
   }
  
   setLoginValidation(true)
   setValues({})
  }
  
  // in the frozen state we get the res.data
  
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


 
 if (!loginValidation) {
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
 } else {
   return (
     
    <div className="master-login-container">
       <alert>HELLO</alert>
    </div>
    
   )
  }
}