import '../styles/Register.css'
import '../styles/Body.css'
import { useState, useEffect } from 'react'
import useForm from '../customHooks/useForm'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function Register() {
  
  const { values, setValues, handleChange, handleSubmit } = useForm(handleRegistration);
  const [error,setError] = useState(null)
  const [data,setData] = useState([])
  const [renderData,setRenderData] = useState(false)
  const history = useHistory();

  useEffect(() => {
    getData()
  },[renderData])

  async function getData() {
    const getData = await axios.get('http://localhost:8080/register')
    setData(getData.data)
    console.log('data',data)
    setRenderData(true)
  }

  function handleRegistration() {

    for (let email of data) {
      if (email.person_email === values.email) {
        setError('email is already taken')
        return;
      }
    }

    if (values.password !== values.password_confirm) {
      setError('passwords do not match')
      console.log('error -->', error)
      return;

    } 
    
    if (values.password.length < 8) {
      setError('password must be at least 8 characters')
      console.log('error -->', error)
      return;
    }
    
    submitFormData()
    console.log('form submitted')
    setValues({})
    // history.push('/login')
    
  }

  function submitFormData() {
    axios.post(`http://localhost:8080/register`, { values })
      .then((res) => {
        console.log('response data -->', res.data)
        return res.data;
      })
    }
    

  return (
    <>
    <div className="master-register-container">
     <div className="register-container">
     
      <h1 className="register-header"><i>Register</i></h1>
     
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-form-left-and-right">
        <div className="register-form-left">
        <input type="text" name="username" placeholder="username" required className="register-input-field" value={values.username} onChange={handleChange}></input>
        <input type="text" name="first_name" placeholder="first name" required className="register-input-field" value={values.first_name} onChange={handleChange}></input>
        <input type="text" name="last_name" placeholder="last name" required className="register-input-field" value={values.last_name} onChange={handleChange}></input>
        <select name="gender" className="register-input-field" id="gender-select" value={values.gender} onChange={handleChange}>
          <option>Select a Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        </div>
        <div className="register-form-right">
        <input type="text" name="address" placeholder="address" required className="register-input-field" value={values.address} onChange={handleChange}></input>
        <input type="email" name="email" placeholder="email" required className="register-input-field" value={values.email} onChange={handleChange}></input>
        <input type="password" name="password" placeholder="password" required className="register-input-field" value={values.password} onChange={handleChange}></input>
        <input type="password" name="password_confirm"placeholder="re-enter password" required className="register-input-field" value={values.password_confirm} onChange={handleChange}></input>
        </div>
        <span className="register-image"><i class="fa-solid fa-registered"></i></span>
        <span className="register-image"><i class="fa-solid fa-user"></i></span>
        </div>
        {error === null ? null : <p className="error">{error}</p>}
        <div className="button-container">
      <button type="submit" className="form-button-submit">Submit</button>
      </div>
      </form>
    </div>
    </div>
    </>
  )
}