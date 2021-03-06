import '../styles/Login.css'
import '../styles/Body.css'
import { useState, useContext, useEffect } from 'react';
import useForm from '../customHooks/useForm'
import axios from 'axios';
import { authContext } from '../provider/AuthProvider';
import LoginPopup from '../components/LoginPopup';
import MoonLoader from "react-spinners/MoonLoader";



export default function Login(props) {
  const { values, setValues, handleChange, handleSubmit } = useForm(handleLogin);
  const { login } = useContext(authContext);
  const [data,setData] = useState([])
  const [error,setError] = useState(null);
  const checkEmails = [];
  const currentEmail = [];
  const [renderData,setRenderData] = useState(false)
  const email = values.email;
  const password = values.password;
  const [trigger,setTrigger] = useState(false);
  const [loading,setLoading] = useState(false)
 
  
  // console logs are saved when we push to the 'frozen world' the window.histroy.go() refreshes the page

  useEffect(() => {
    getData()
  },[renderData])

  async function getData() {
    const getData = await axios.get('http://localhost:8080/login')
    setData(getData.data)
    console.log('data',data)
    setRenderData(true)
  }

  
  function handleLogin() {
    for(let obj of data) {
      checkEmails.push(obj.person_email)
    }
    
    for (let userEmail of checkEmails) {
      console.log('user email', userEmail)
      if(userEmail === values.email) {
        currentEmail.push(userEmail)
      }
      
    }

    console.log('check email',checkEmails)
    console.log('current email', currentEmail)

    if (currentEmail.length === 0) {
      setError('Email does not exist. Please try again');
      return;
    }
    
    for (let personInfo of data) {
      if (personInfo.person_email === values.email) {
        if (personInfo.person_password === values.password) {
          console.log('your in -->', personInfo)
        } else {
          setError('Password is incorrect.')
          return;
        }
      }
    }
    
    setLoading(true)
    setTimeout(() => {
      setLoading(false);
    }, 800);
    setTrigger(true)
    setValues({})
    userLogin()
  }
  
  function userLogin(){
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

  if (loading) {
    return (
      <>
      <div className="master-login-container">
        <h2 className="login-header">Login to Start Chatting</h2>
       <div className="login-container">
        <form className="login-form-loading" onSubmit={handleSubmit}>
        <MoonLoader className="loading" loading={loading} size={50} />
        </form>
      </div>
      </div>
      </>
    )
  }

  if (trigger) {
    return (
    <>
    <div className="master-login-container">
      <h2 className='login-header'>Successfully Logged In <i class="fas fa-check"></i></h2>
     <div className="trigger-login-container">
      <LoginPopup trigger={trigger} />
     </div>
    </div>
    </>
   )
  }

  return (
    <>
     <div className="master-login-container">
       <h2 className="login-header">Login to Start Chatting</h2>
      <div className={trigger ? "trigger-login-container" : "login-container"}>
       <form className="login-form" onSubmit={handleSubmit}>
         <input type="email" name="email" placeholder="email"className="input-field" onChange={handleChange} required></input>
         <input type="password" name="password" placeholder="password" className="input-field" onChange={handleChange}  required></input>
         {!error ? null : <p className="error" id="error">{error}</p>}
         <button type="submit" className="form-button-submit">Login</button>
       </form>
     </div>
     </div>
     </>
    )
}